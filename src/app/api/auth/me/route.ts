import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, sanitizeUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = await verifyAuth(request);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ success: true, user: sanitizeUser(user) });
}
