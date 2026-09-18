import { NextRequest, NextResponse } from 'next/server';
import { supabaseAuthAdapter } from '@/server/services/supabaseAuthAdapter';

export async function POST(request: NextRequest) {
  try {
    const { email, code, newPassword } = await request.json();

    if (!email || !code || !newPassword) {
      return NextResponse.json({
        success: false,
        message: 'Please provide email, verification code, and new password.'
      }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      }, { status: 400 });
    }

    const res = await supabaseAuthAdapter.resetPassword(email, code, newPassword);

    if (!res.success) {
      return NextResponse.json({ success: false, message: res.error || 'Password reset failed' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Password has been updated successfully. Please sign in.'
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Server error during password reset' }, { status: 500 });
  }
}
