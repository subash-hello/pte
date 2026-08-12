import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken, sanitizeUser } from '@/lib/auth';
import { fallbackDb } from '@/lib/fallbackDb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Missing email or password' }, { status: 400 });
    }

    const db = await connectToDatabase();

    // Fallback mode if MongoDB Atlas IP is not whitelisted
    if (!db) {
      const fbUser = fallbackDb.findByEmail(email);
      if (!fbUser) {
        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
      }

      const isMatch = await fallbackDb.comparePassword(password, fbUser.password);
      if (!isMatch) {
        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
      }

      if (fbUser.status === 'declined') {
        return NextResponse.json({ success: false, message: 'Account declined' }, { status: 403 });
      }

      fallbackDb.updateUser(fbUser.id, { lastLoginAt: new Date().toISOString(), loginAttempts: 0 });
      const token = fallbackDb.generateToken(fbUser);

      return NextResponse.json({
        success: true,
        token,
        user: fbUser,
        notice: 'Running in fallback database mode'
      }, { status: 200 });
    }

    // Normal MongoDB Atlas flow
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      user.loginAttempts += 1;
      await user.save();
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    if (user.status === 'declined') {
      return NextResponse.json({ success: false, message: 'Account declined' }, { status: 403 });
    }

    user.lastLoginAt = new Date();
    user.loginAttempts = 0;
    await user.save();

    const token = generateToken(user);

    return NextResponse.json({ success: true, token, user: sanitizeUser(user) }, { status: 200 });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
  }
}
