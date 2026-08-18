import { NextRequest, NextResponse } from 'next/server';
import { extractUserFromRequest } from '@/lib/auth';
import { sessionTracker } from '@/lib/activityStore';

export async function POST(request: NextRequest) {
  try {
    const authUser = await extractUserFromRequest(request);
    if (authUser?.userId || authUser?.id) {
      sessionTracker.removeSession(authUser.userId || authUser.id);
    }

    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
    
    // Clear cookies if any
    response.cookies.set('auth_token', '', { maxAge: 0, path: '/' });
    response.cookies.set('session', '', { maxAge: 0, path: '/' });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
