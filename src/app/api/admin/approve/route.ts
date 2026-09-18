import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { verifyAdminAuth, sanitizeUser } from '@/lib/auth';
import { supabaseAuthAdapter } from '@/server/services/supabaseAuthAdapter';

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

    const newStatus = action === 'approve' ? 'approved' : 'declined';
    const approvedAt = action === 'approve' ? new Date().toISOString() : null;

    // 1. Update in Supabase Auth
    try {
      const supaUpdated = await supabaseAuthAdapter.updateUser(userId, {
        status: newStatus,
        approvedAt,
      });
      if (supaUpdated) {
        // Also sync to MongoDB / Fallback
        connectToDatabase().then(async (db) => {
          if (db) {
            await User.findByIdAndUpdate(userId, { status: newStatus, approvedAt: approvedAt ? new Date(approvedAt) : null });
          }
        }).catch(() => {});

        const { fallbackDb } = await import('@/lib/fallbackDb');
        fallbackDb.updateUser(userId, { status: newStatus, approvedAt });

        return NextResponse.json({ success: true, user: sanitizeUser(supaUpdated) });
      }
    } catch (e) {
      console.warn('Supabase approve sync notice:', e);
    }

    // 2. Update in MongoDB
    const db = await connectToDatabase();
    if (db) {
      const targetUser = await User.findById(userId);
      if (targetUser) {
        if (adminUser.role === 'branch_admin' && targetUser.branch !== adminUser.branch) {
          return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
        }
        targetUser.status = newStatus;
        targetUser.approvedAt = approvedAt ? new Date(approvedAt) : null;
        await targetUser.save();
        return NextResponse.json({ success: true, user: sanitizeUser(targetUser) });
      }
    }

    // 3. Update in Fallback DB
    const { fallbackDb } = await import('@/lib/fallbackDb');
    const fbUpdated = fallbackDb.updateUser(userId, {
      status: newStatus,
      approvedAt
    });

    if (fbUpdated) {
      return NextResponse.json({ success: true, user: sanitizeUser(fbUpdated) });
    }

    return NextResponse.json({ success: false, message: 'User account not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
