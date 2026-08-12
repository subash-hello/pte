import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { verifyAdminAuth, verifySuperAdminAuth, sanitizeUser } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    await connectToDatabase();

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    if (adminUser.role === 'branch_admin' && targetUser.branch !== adminUser.branch) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const updatableFields = ['name', 'email', 'phone', 'role', 'branch', 'status', 'password', 'pteGoal', 'subscription', 'accessDurationDays'];
    for (const field of updatableFields) {
      if (body[field] !== undefined) {
        (targetUser as any)[field] = body[field];
      }
    }

    await targetUser.save();

    return NextResponse.json({ success: true, user: sanitizeUser(targetUser) });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminUser = await verifySuperAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    await User.findByIdAndDelete(id);
    
    try {
      const mongoose = (await import('mongoose')).default;
      if (mongoose.models.PracticeResponse) {
        await mongoose.models.PracticeResponse.deleteMany({ user: id });
      }
      if (mongoose.models.Scorecard) {
        await mongoose.models.Scorecard.deleteMany({ user: id });
      }
    } catch (e) {
      // Ignore if models don't exist
    }

    return NextResponse.json({ success: true, message: 'User deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
