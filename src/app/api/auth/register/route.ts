import { NextRequest, NextResponse } from 'next/server';
import { supabaseAuthAdapter } from '@/server/services/supabaseAuthAdapter';
import { generateToken, sanitizeUser } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { fallbackDb } from '@/lib/fallbackDb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password, branch, pteGoal, targetScore, status } = body;

    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields (Full Name, Email, Password)'
      }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const studentStatus = status || 'approved'; // Can be 'approved' or 'pending'

    // 1. Primary Registration: Supabase Auth
    try {
      const supaResult = await supabaseAuthAdapter.signUp({
        name: name.trim(),
        email: normalizedEmail,
        password,
        phone: phone ? phone.trim() : '+977 9800000000',
        branch: branch || 'Kathmandu Central Campus',
        pteGoal: pteGoal ? Number(pteGoal) : 79,
        targetScore: targetScore || `${pteGoal || 79}+ (GSE ${pteGoal || 79})`,
        role: 'student',
        status: studentStatus,
      });

      if (!supaResult.success) {
        return NextResponse.json({
          success: false,
          message: supaResult.error || 'Failed to create candidate account.'
        }, { status: 409 });
      }

      if (supaResult.user) {
        const token = generateToken(supaResult.user);

        // Mirror to MongoDB Atlas in background
        connectToDatabase().then(async (db) => {
          if (db) {
            const exists = await User.findOne({ email: normalizedEmail });
            if (!exists) {
              await User.create({
                name: name.trim(),
                email: normalizedEmail,
                phone: phone ? phone.trim() : '',
                password,
                branch: branch || 'Kathmandu Central Campus',
                pteGoal: pteGoal ? Number(pteGoal) : 79,
                role: 'student',
                status: studentStatus,
                approvedAt: studentStatus === 'approved' ? new Date() : null,
              });
            }
          }
        }).catch(() => {});

        return NextResponse.json({
          success: true,
          token,
          user: sanitizeUser(supaResult.user),
          message: studentStatus === 'pending'
            ? 'Account registered. Awaiting campus administration authorization.'
            : 'Account registered successfully!'
        }, { status: 201 });
      }
    } catch (supaErr: any) {
      console.warn('Supabase signup error, using secondary stores:', supaErr);
    }

    // 2. Secondary Registration: MongoDB Atlas
    const db = await connectToDatabase();
    if (db) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return NextResponse.json({ success: false, message: 'Email address is already registered' }, { status: 409 });
      }

      const user = new User({
        name: name.trim(),
        email: normalizedEmail,
        phone: phone ? phone.trim() : '',
        password,
        branch: branch || 'Kathmandu Central Campus',
        pteGoal: pteGoal ? Number(pteGoal) : 79,
        role: 'student',
        status: studentStatus,
        approvedAt: studentStatus === 'approved' ? new Date() : null,
        lastLoginAt: new Date()
      });

      await user.save();
      const token = generateToken(user);
      
      return NextResponse.json({
        success: true,
        token,
        user: sanitizeUser(user),
        message: 'Account registered successfully!'
      }, { status: 201 });
    }

    // 3. Fallback database
    const existingFb = fallbackDb.findByEmail(normalizedEmail);
    if (existingFb) {
      return NextResponse.json({ success: false, message: 'Email address is already registered' }, { status: 409 });
    }

    const newFb = await fallbackDb.createUser({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone ? phone.trim() : '+977 9800000000',
      password,
      branch: branch || 'Kathmandu Central Campus',
      pteGoal: pteGoal ? Number(pteGoal) : 79,
      role: 'student',
      status: studentStatus,
      approvedAt: studentStatus === 'approved' ? new Date().toISOString() : null,
    });

    const token = fallbackDb.generateToken(newFb);
    return NextResponse.json({
      success: true,
      token,
      user: newFb,
      message: 'Account registered successfully!'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Registration error' }, { status: 500 });
  }
}
