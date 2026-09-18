import { NextRequest, NextResponse } from 'next/server';
import { supabaseAuthAdapter } from '@/server/services/supabaseAuthAdapter';
import { generateToken, sanitizeUser } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { fallbackDb } from '@/lib/fallbackDb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Please provide both email and password.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Primary Authentication: Supabase Auth
    try {
      const supaResult = await supabaseAuthAdapter.signIn(normalizedEmail, password);
      if (supaResult.success && supaResult.user) {
        const user = supaResult.user;

        // Increment token version for single-device active session enforcement
        const nextVersion = (user.tokenVersion || 0) + 1;
        await supabaseAuthAdapter.updateUser(user.id, {
          tokenVersion: nextVersion,
          lastActive: new Date().toISOString()
        });
        user.tokenVersion = nextVersion;

        const token = generateToken(user);

        // Account declined check
        if (user.status === 'declined') {
          return NextResponse.json({
            success: false,
            message: 'Your registration request was declined by campus administration.',
            status: 'declined',
            token,
            user: sanitizeUser(user)
          }, { status: 403 });
        }

        return NextResponse.json({
          success: true,
          token,
          user: sanitizeUser(user),
          authProvider: 'supabase'
        }, { status: 200 });
      }
    } catch (supaErr) {
      console.warn('Supabase Auth error, checking secondary stores:', supaErr);
    }

    // 2. Secondary Authentication: MongoDB Atlas
    try {
      const db = await connectToDatabase();
      if (db) {
        const user = await User.findOne({ email: normalizedEmail });
        if (user) {
          const isMatch = await user.comparePassword(password);
          if (isMatch) {
            if (user.status === 'declined') {
              return NextResponse.json({ success: false, message: 'Account declined', status: 'declined' }, { status: 403 });
            }
            user.tokenVersion = (user.tokenVersion || 0) + 1;
            user.lastLoginAt = new Date();
            user.loginAttempts = 0;
            await user.save();
            const token = generateToken(user);
            return NextResponse.json({ success: true, token, user: sanitizeUser(user), authProvider: 'mongodb' }, { status: 200 });
          }
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB check error:', dbErr);
    }

    // 3. Resilient Fallback Database
    const fbUser = fallbackDb.findByEmail(normalizedEmail);
    if (fbUser) {
      const isMatch = await fallbackDb.comparePassword(password, fbUser.password);
      if (isMatch) {
        if (fbUser.status === 'declined') {
          return NextResponse.json({ success: false, message: 'Account declined', status: 'declined' }, { status: 403 });
        }
        fbUser.tokenVersion = (fbUser.tokenVersion || 0) + 1;
        fallbackDb.updateUser(fbUser.id, { lastLoginAt: new Date().toISOString(), loginAttempts: 0, tokenVersion: fbUser.tokenVersion });
        const token = fallbackDb.generateToken(fbUser);
        return NextResponse.json({ success: true, token, user: fbUser, authProvider: 'fallback' }, { status: 200 });
      }
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid credentials. Please verify your email and password.'
    }, { status: 401 });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal authentication error' }, { status: 500 });
  }
}
