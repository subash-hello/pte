import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken, sanitizeUser } from '@/lib/auth';
import { fallbackDb } from '@/lib/fallbackDb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password, branch, pteGoal } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Missing required fields (Name, Email, Password)' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const db = await connectToDatabase();

    // Fallback mode if MongoDB Atlas IP is not connected
    if (!db) {
      const existingFbUser = fallbackDb.findByEmail(normalizedEmail);
      if (existingFbUser) {
        return NextResponse.json({ success: false, message: 'Email address is already registered' }, { status: 409 });
      }

      const newFbUser = await fallbackDb.createUser({
        name: name.trim(),
        email: normalizedEmail,
        phone: phone ? phone.trim() : '+977 9800000000',
        password,
        branch: branch || 'Kathmandu Main Campus',
        pteGoal: pteGoal ? Number(pteGoal) : 79,
        role: 'student',
        status: 'approved',
        approvedAt: new Date().toISOString()
      });

      const token = fallbackDb.generateToken(newFbUser);

      return NextResponse.json({
        success: true,
        token,
        user: newFbUser,
        message: 'Account created successfully!'
      }, { status: 201 });
    }

    // Normal MongoDB Atlas flow
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Email address is already registered' }, { status: 409 });
    }

    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone ? phone.trim() : '',
      password,
      branch: branch || 'Kathmandu Main Campus',
      pteGoal: pteGoal ? Number(pteGoal) : 79,
      role: 'student',
      status: 'approved',
      approvedAt: new Date(),
      lastLoginAt: new Date()
    });

    await user.save();

    const token = generateToken(user);
    
    return NextResponse.json({
      success: true,
      token,
      user: sanitizeUser(user),
      message: 'Account created successfully!'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error during registration' }, { status: 500 });
  }
}
