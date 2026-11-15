import { NextRequest, NextResponse } from 'next/server';
import { supabaseAuthAdapter } from '@/server/services/supabaseAuthAdapter';
import { supabaseStore, INITIAL_BRANCHES } from '@/server/db/supabaseStore';
import { generateToken, sanitizeUser } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { fallbackDb } from '@/lib/fallbackDb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password, branch, branchCode, examDate, pteGoal, targetScore, status } = body;

    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields (Full Name, Email, Password)'
      }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const studentStatus = status || 'approved';

    // Resolve Branch by branchCode if provided
    let resolvedBranch = branch || 'Kathmandu Central Campus';
    let resolvedBranchCode = branchCode ? String(branchCode).trim().toUpperCase().replace(/[^A-Z0-9]/g, '') : '';

    if (resolvedBranchCode) {
      try {
        const branches = await supabaseStore.getCollection<any>('branches');
        const allBranches = branches.length ? branches : INITIAL_BRANCHES;
        const matchedBranch = allBranches.find(
          (b: any) =>
            (b.code || '').toUpperCase() === resolvedBranchCode ||
            (b.name || '').toLowerCase() === resolvedBranchCode.toLowerCase()
        );

        if (matchedBranch) {
          resolvedBranch = matchedBranch.name;
          resolvedBranchCode = matchedBranch.code || resolvedBranchCode;

          // Check branch quota limit if userLimit > 0
          const limit = Number(matchedBranch.userLimit) || 0;
          if (limit > 0) {
            const existingUsers = await supabaseAuthAdapter.listUsers({ branch: matchedBranch.name });
            const studentCount = existingUsers.filter(u => u.role === 'student').length;
            if (studentCount >= limit) {
              return NextResponse.json({
                success: false,
                message: `Branch "${matchedBranch.name}" (${resolvedBranchCode}) has reached its maximum user creation limit (${limit}). Please contact your consultancy admin.`
              }, { status: 403 });
            }
          }
        } else {
          // Still store the code and link to consultancy branch
          resolvedBranch = `Consultancy (${resolvedBranchCode})`;
        }
      } catch (e) {
        console.warn('Branch lookup warning:', e);
      }
    }

    // 1. Primary Registration: Supabase Auth
    try {
      const supaResult = await supabaseAuthAdapter.signUp({
        name: name.trim(),
        email: normalizedEmail,
        password,
        phone: phone ? phone.trim() : '+977 9800000000',
        branch: resolvedBranch,
        branchCode: resolvedBranchCode,
        examDate: examDate || '',
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

        // Sync to Supabase Storage users.json collection
        supabaseStore.insertItem('users', supaResult.user).catch(() => {});

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
                branch: resolvedBranch,
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
