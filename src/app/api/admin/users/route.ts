import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { verifyAdminAuth, sanitizeUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  await connectToDatabase();

  const query: any = {};

  if (adminUser.role === 'branch_admin') {
    query.branch = adminUser.branch;
  }

  if (role) query.role = role;
  if (status) query.status = status;
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const users = await User.find(query).sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    users: users.map(u => sanitizeUser(u))
  });
}

export async function POST(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    let { name, email, phone, password, role, branch, status } = body;

    if (adminUser.role === 'branch_admin') {
      branch = adminUser.branch;
      role = 'student';
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 });
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      phone,
      password,
      role: role || 'student',
      branch: branch || '',
      status: 'approved',
      approvedAt: new Date()
    });

    await newUser.save();

    return NextResponse.json({ success: true, user: sanitizeUser(newUser) }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
