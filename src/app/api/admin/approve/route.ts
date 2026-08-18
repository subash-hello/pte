import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { verifyAdminAuth, sanitizeUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { userId, action } = body;

    if (!userId || !['approve', 'decline'].includes(action)) {
      return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (!db) {
      const { fallbackDb } = await import('@/lib/fallbackDb');
      const updated = fallbackDb.updateUser(userId, {
        status: action === 'approve' ? 'approved' : 'declined',
        approvedAt: action === 'approve' ? new Date().toISOString() : null
      });

      if (!updated) {
        return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, user: sanitizeUser(updated) });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    if (adminUser.role === 'branch_admin' && targetUser.branch !== adminUser.branch) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    if (action === 'approve') {
      targetUser.status = 'approved';
      targetUser.approvedAt = new Date();
    } else {
      targetUser.status = 'declined';
    }

    await targetUser.save();

    return NextResponse.json({ success: true, user: sanitizeUser(targetUser) });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
