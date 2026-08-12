import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken, sanitizeUser } from '@/lib/auth';
import { fallbackDb } from '@/lib/fallbackDb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password, branch } = body;

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const db = await connectToDatabase();

    // Fallback mode if MongoDB Atlas IP is not whitelisted
    if (!db) {
      const existingFbUser = fallbackDb.findByEmail(email);
      if (existingFbUser) {
        return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 });
      }

      const newFbUser = await fallbackDb.createUser({
        name,
        email: email.toLowerCase(),
        phone,
        password,
        branch: branch || 'Kathmandu Main Campus',
        role: 'student',
        status: 'pending'
      });

      const token = fallbackDb.generateToken(newFbUser);

      return NextResponse.json({
        success: true,
        token,
        user: newFbUser,
        notice: 'Running in fallback database mode'
      }, { status: 201 });
    }

    // Normal MongoDB Atlas flow
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 });
    }

    const user = new User({
      name,
      email: email.toLowerCase(),
      phone,
      password,
      branch: branch || '',
      role: 'student',
      status: 'pending'
    });

    await user.save();

    const token = generateToken(user);
    
    return NextResponse.json({ success: true, token, user: sanitizeUser(user) }, { status: 201 });
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
  }
}
