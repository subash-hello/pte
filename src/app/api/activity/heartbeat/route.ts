import { NextRequest, NextResponse } from 'next/server';
import { extractUserFromRequest } from '@/lib/auth';
import { sessionTracker } from '@/lib/activityStore';

export async function POST(request: NextRequest) {
  try {
    const authUser = await extractUserFromRequest(request);
    const body = await request.json();

    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Unauthenticated' }, { status: 401 });
    }

    const ip = request.headers.get('x-forwarded-for') || '103.10.28.45';
    const userAgent = request.headers.get('user-agent') || 'Browser Client';

    const session = sessionTracker.recordHeartbeat({
      userId: authUser.userId || authUser.id,
      name: authUser.name || 'Student',
      email: authUser.email || '',
      role: authUser.role || 'student',
      branch: authUser.branch || 'Kathmandu Central Campus',
      currentTask: body.currentTask || 'Practicing Questions',
      ip: `${ip} (Nepal)`,
      device: userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop Browser',
    });

    return NextResponse.json({ success: true, session });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
