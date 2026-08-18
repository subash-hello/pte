import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { sessionTracker } from '@/lib/activityStore';

export async function GET(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  let sessions = sessionTracker.getActiveSessions();

  // If branch admin, filter to their branch
  if (adminUser.role === 'branch_admin' && adminUser.branch) {
    sessions = sessions.filter((s: any) => s.branch === adminUser.branch);
  }

  return NextResponse.json({ success: true, sessions });
}

export async function DELETE(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId') || searchParams.get('userId');

  if (!sessionId) {
    return NextResponse.json({ success: false, message: 'Missing session ID' }, { status: 400 });
  }

  const removed = sessionTracker.removeSession(sessionId);
  return NextResponse.json({ success: true, message: removed ? 'Session disconnected' : 'Session not found' });
}
