import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, sanitizeUser } from '@/lib/auth';
import { supabaseAuthAdapter } from '@/server/services/supabaseAuthAdapter';

export async function GET(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role') || undefined;
  const status = searchParams.get('status') || undefined;
  const search = searchParams.get('search') || undefined;
  const branch = adminUser.role === 'branch_admin' ? adminUser.branch : (searchParams.get('branch') || undefined);

  try {
    const supaUsers = await supabaseAuthAdapter.listUsers({
      role,
      status,
      branch,
      search,
    });

    if (supaUsers.length > 0) {
      return NextResponse.json({
        success: true,
        users: supaUsers.map(u => sanitizeUser(u)),
        source: 'supabase',
      });
    }

    const { fallbackDb } = await import('@/lib/fallbackDb');
    let fbUsers = fallbackDb.getUsers();

    if (adminUser.role === 'branch_admin') {
      fbUsers = fbUsers.filter(u => (u.branch || '').toLowerCase().includes((adminUser.branch || '').toLowerCase()));
    }
    if (role && role !== 'All') {
      fbUsers = fbUsers.filter(u => u.role === role);
    }
    if (status && status !== 'All') {
      fbUsers = fbUsers.filter(u => u.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      fbUsers = fbUsers.filter(
        u =>
          (u.name || '').toLowerCase().includes(q) ||
          (u.email || '').toLowerCase().includes(q) ||
          (u.phone || '').includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      users: fbUsers.map(u => sanitizeUser(u)),
    });
  } catch (err: any) {
    const { fallbackDb } = await import('@/lib/fallbackDb');
    return NextResponse.json({
      success: true,
      users: fallbackDb.getUsers().map(u => sanitizeUser(u)),
    });
  }
}

export async function POST(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    let { name, email, phone, password, role, branch, branchCode, status, targetScore, accessDurationDays, subscription } = body;

    if (adminUser.role === 'branch_admin') {
      branch = adminUser.branch;
      role = 'student';
    }

    const { supabaseStore, INITIAL_BRANCHES } = await import('@/server/db/supabaseStore');
    const branches = await supabaseStore.getCollection<any>('branches');
    const allBranches = branches.length ? branches : INITIAL_BRANCHES;

    // Check Branch Quota Limit when creating a student
    if ((role || 'student') === 'student' && branch) {
      const matchedBranch = allBranches.find(
        (b: any) => (b.name || '').toLowerCase() === branch.toLowerCase() || (b.name || '').toLowerCase().includes(branch.toLowerCase().split(' ')[0])
      );
      if (matchedBranch) {
        branchCode = matchedBranch.code || branchCode;
        const limit = Number(matchedBranch.userLimit) || 0;
        if (limit > 0) {
          const existingStudents = await supabaseAuthAdapter.listUsers({ branch: matchedBranch.name });
          const count = existingStudents.filter(u => u.role === 'student').length;
          if (count >= limit) {
            return NextResponse.json(
              {
                success: false,
                message: `Quota Limit Reached: Branch "${matchedBranch.name}" has reached its maximum user creation limit (${count}/${limit}). Ask Super Admin to increase the branch quota.`,
              },
              { status: 403 }
            );
          }
        }
      }
    }

    const assignedStatus = status || 'approved';
    const assignedPassword = password || 'student123';

    const supaUser = await supabaseAuthAdapter.signUp({
      name,
      email,
      password: assignedPassword,
      phone,
      role: role || 'student',
      branch: branch || 'Kathmandu Central Campus',
      branchCode: branchCode || '',
      status: assignedStatus,
      targetScore: targetScore || '79+ (GSE 79)',
      accessDurationDays: Number(accessDurationDays) || 30,
      subscription: subscription || (role === 'branch_admin' ? 'premium' : 'free'),
    });

    if (supaUser.success && supaUser.user) {
      await supabaseStore.insertItem('users', supaUser.user).catch(() => {});

      // If creating a Branch Admin, ensure their branch exists in branches.json
      if (role === 'branch_admin' && branch) {
        const exists = allBranches.some((b: any) => (b.name || '').toLowerCase() === branch.trim().toLowerCase());
        if (!exists) {
          const prefix = branch.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4) || 'BRCH';
          const autoCode = branchCode || `${prefix}${Math.floor(10 + Math.random() * 89)}`;
          await supabaseStore.insertItem('branches', {
            _id: `b_${Date.now()}`,
            name: branch.trim(),
            code: autoCode,
            location: branch.trim(),
            adminName: name.trim(),
            adminEmail: email.toLowerCase().trim(),
            adminPhone: phone || '+977 9800000000',
            status: 'active',
            userLimit: 0,
            studentCapacity: 100,
          }).catch(() => {});
        }
      }

      return NextResponse.json({ success: true, user: sanitizeUser(supaUser.user) }, { status: 201 });
    }

    return NextResponse.json(
      { success: false, message: supaUser.error || 'Failed to create user in Supabase' },
      { status: 409 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
