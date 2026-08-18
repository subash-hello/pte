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

  try {
    const db = await connectToDatabase();
    if (!db) {
      const { fallbackDb } = await import('@/lib/fallbackDb');
      let fbUsers = fallbackDb.getUsers();

      if (adminUser.role === 'branch_admin') {
        fbUsers = fbUsers.filter(u => (u.branch || '').toLowerCase().includes((adminUser.branch || '').toLowerCase()));
      }

      if (role && role !== 'All') {
        fbUsers = fbUsers.filter(u => u.role === role);
      }
      if (status && status !== 'All') {
        fbUsers = fbUsers.filter(u => u.status === status);
      }
      if (search) {
        const q = search.toLowerCase();
        fbUsers = fbUsers.filter(u => 
          (u.name || '').toLowerCase().includes(q) || 
          (u.email || '').toLowerCase().includes(q) ||
          (u.phone || '').includes(q)
        );
      }

      return NextResponse.json({
        success: true,
        users: fbUsers.map(u => sanitizeUser(u))
      });
    }

    const query: any = {};

    if (adminUser.role === 'branch_admin') {
      query.branch = adminUser.branch;
    }

    if (role && role !== 'All') query.role = role;
    if (status && status !== 'All') query.status = status;
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      users: users.map(u => sanitizeUser(u))
    });
  } catch (err: any) {
    const { fallbackDb } = await import('@/lib/fallbackDb');
    return NextResponse.json({
      success: true,
      users: fallbackDb.getUsers().map(u => sanitizeUser(u))
    });
  }
}

export async function POST(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    let { name, email, phone, password, role, branch, status, targetScore, accessDurationDays } = body;

    if (adminUser.role === 'branch_admin') {
      branch = adminUser.branch;
      role = 'student';
    }

    const db = await connectToDatabase();
    if (!db) {
      const { fallbackDb } = await import('@/lib/fallbackDb');
      const existingUser = fallbackDb.findByEmail(email);
      if (existingUser) {
        return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 });
      }

      const newUser = await fallbackDb.createUser({
        name,
        email,
        phone,
        password: password || 'student123',
        role: role || 'student',
        branch: branch || 'Kathmandu Central Campus',
        status: status || 'approved',
        accessDurationDays: accessDurationDays || 30
      });

      return NextResponse.json({ success: true, user: sanitizeUser(newUser) }, { status: 201 });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 });
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      phone,
      password: password || 'student123',
      role: role || 'student',
      branch: branch || '',
      status: status || 'approved',
      accessDurationDays: accessDurationDays || 30,
      approvedAt: status === 'pending' ? null : new Date()
    });

    await newUser.save();

    return NextResponse.json({ success: true, user: sanitizeUser(newUser) }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
