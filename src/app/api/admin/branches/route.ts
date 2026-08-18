import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Branch from '@/models/Branch';
import User from '@/models/User';
import { verifyAdminAuth, verifySuperAdminAuth } from '@/lib/auth';

const fallbackBranchesStore = [
  {
    _id: 'b_1',
    name: 'Kathmandu Central Campus',
    location: 'Putalisadak, Kathmandu',
    adminName: 'Ramesh Sharma',
    adminEmail: 'ktm.admin@pteai.com',
    adminPhone: '+977 9851012345',
    status: 'active' as const,
    studentCapacity: 150,
    createdAt: new Date('2026-07-15').toISOString(),
  },
  {
    _id: 'b_2',
    name: 'Pokhara Regional Campus',
    location: 'Chipledhunga, Pokhara',
    adminName: 'Sita Sharma',
    adminEmail: 'pokhara.admin@pteai.com',
    adminPhone: '+977 9856023456',
    status: 'active' as const,
    studentCapacity: 100,
    createdAt: new Date('2026-07-20').toISOString(),
  },
  {
    _id: 'b_3',
    name: 'Lalitpur Tech Branch',
    location: 'Kumaripati, Lalitpur',
    adminName: 'Nabin Silwal',
    adminEmail: 'lalitpur.admin@pteai.com',
    adminPhone: '+977 9855022334',
    status: 'active' as const,
    studentCapacity: 80,
    createdAt: new Date('2026-08-01').toISOString(),
  },
  {
    _id: 'b_4',
    name: 'Chitwan Academic Centre',
    location: 'Lions Chowk, Bharatpur',
    adminName: 'Anuraj Phuyal',
    adminEmail: 'chitwan.admin@pteai.com',
    adminPhone: '+977 9845012345',
    status: 'active' as const,
    studentCapacity: 60,
    createdAt: new Date('2026-08-10').toISOString(),
  }
];

export async function GET(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, branches: fallbackBranchesStore });
    }

    const branches = await Branch.find().sort({ createdAt: -1 });
    if (!branches || branches.length === 0) {
      // Seed initial 2 branches
      for (const fb of fallbackBranchesStore) {
        const exists = await Branch.findOne({ name: fb.name });
        if (!exists) {
          await Branch.create(fb);
        }
      }
      const seeded = await Branch.find().sort({ createdAt: -1 });
      return NextResponse.json({ success: true, branches: seeded });
    }

    return NextResponse.json({ success: true, branches });
  } catch (error: any) {
    return NextResponse.json({ success: true, branches: fallbackBranchesStore });
  }
}

export async function POST(request: NextRequest) {
  const adminUser = await verifySuperAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized: Super Admin required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, location, adminName, adminEmail, adminPhone, studentCapacity } = body;

    if (!name || !location || !adminName || !adminEmail) {
      return NextResponse.json({ success: false, message: 'Missing required branch fields' }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (!db) {
      const newB = {
        _id: `b_${Date.now()}`,
        name,
        location,
        adminName,
        adminEmail: adminEmail.toLowerCase(),
        adminPhone: adminPhone || '',
        status: 'active',
        studentCapacity: studentCapacity || 100,
        createdAt: new Date().toISOString(),
      };
      fallbackBranchesStore.unshift(newB as any);
      return NextResponse.json({ success: true, branch: newB }, { status: 201 });
    }

    const existingBranch = await Branch.findOne({ name });
    if (existingBranch) {
      return NextResponse.json({ success: false, message: 'Branch name already exists' }, { status: 409 });
    }

    const newBranch = new Branch({
      name,
      location,
      adminName,
      adminEmail: adminEmail.toLowerCase(),
      adminPhone,
      studentCapacity: studentCapacity || 100,
      status: 'active',
    });

    await newBranch.save();

    return NextResponse.json({ success: true, branch: newBranch }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
