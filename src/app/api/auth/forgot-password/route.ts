import { NextRequest, NextResponse } from 'next/server';
import { supabaseAuthAdapter } from '@/server/services/supabaseAuthAdapter';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, message: 'Please provide an email address.' }, { status: 400 });
    }

    const code = supabaseAuthAdapter.generateResetCode(email);

    return NextResponse.json({
      success: true,
      message: 'Verification reset code generated.',
      demoCode: code // Displayed for convenience and fast testing
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
  }
}
