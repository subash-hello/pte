import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, verifySuperAdminAuth } from '@/lib/auth';
import { supabaseStore, INITIAL_BRANCHES } from '@/server/db/supabaseStore';
import { supabaseAuthAdapter } from '@/server/services/supabaseAuthAdapter';

function generateBranchCode(name: string, index = 1): string {
  const prefix = name
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .slice(0, 4) || 'BRCH';
  const num = String((index * 7 + 11) % 90 + 10);
  return `${prefix}${num}`;
}

export async function GET(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rawBranches = await supabaseStore.getCollection<any>('branches');
    const baseBranches = rawBranches.length ? rawBranches : INITIAL_BRANCHES;
    const allUsers = await supabaseAuthAdapter.listUsers();

    // Enrich branches with live user statistics from Supabase
    const enriched = baseBranches.map((b: any, idx: number) => {
      const code = b.code || generateBranchCode(b.name || 'Branch', idx + 1);
      const branchStudents = allUsers.filter(
        u =>
          u.role === 'student' &&
          ((u.branch || '').toLowerCase() === (b.name || '').toLowerCase() ||
            (u.branch || '').toLowerCase().includes((b.name || '').toLowerCase().split(' ')[0]) ||
            (u.branchCode && u.branchCode.toUpperCase() === code.toUpperCase()))
      );

      const freeCount = branchStudents.filter(u => u.subscription === 'free').length;
      const proCount = branchStudents.filter(u => u.subscription === 'pro' || u.subscription === 'premium').length;
      const approvedCount = branchStudents.filter(u => u.status === 'approved').length;
      const pendingCount = branchStudents.filter(u => u.status === 'pending').length;

      // Date-wise user creation breakdown
      const dateMap: Record<string, number> = {};
      branchStudents.forEach(s => {
        const d = s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Aug 15, 2026';
        dateMap[d] = (dateMap[d] || 0) + 1;
      });
      const dateBreakdown = Object.entries(dateMap).map(([date, count]) => ({ date, count }));

      return {
        ...b,
        _id: b._id || b.id,
        id: b.id || b._id,
        code,
        userLimit: b.userLimit !== undefined ? Number(b.userLimit) : 0,
        totalStudents: branchStudents.length,
        freeCount,
        proCount,
        approvedCount,
        pendingCount,
        dateBreakdown,
      };
    });

    const filtered =
      adminUser.role === 'branch_admin'
        ? enriched.filter(
            (b: any) =>
              (b.name || '').toLowerCase().includes((adminUser.branch || '').toLowerCase().split(' ')[0]) ||
              (b.adminEmail || '').toLowerCase() === (adminUser.email || '').toLowerCase()
          )
        : enriched;

    return NextResponse.json({ success: true, branches: filtered.length ? filtered : enriched });
  } catch (error: any) {
    return NextResponse.json({ success: true, branches: INITIAL_BRANCHES });
  }
}

export async function POST(request: NextRequest) {
  const adminUser = await verifySuperAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized: Super Admin required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, code, location, adminName, adminEmail, adminPhone, password, userLimit, studentCapacity } = body;

    if (!name || !adminName || !adminEmail) {
      return NextResponse.json({ success: false, message: 'Missing required branch fields (Branch Name, Admin Name, Admin Email)' }, { status: 400 });
    }

    const branches = await supabaseStore.getCollection<any>('branches');
    const cleanCode = (code ? String(code).toUpperCase().replace(/[^A-Z0-9]/g, '') : '') || generateBranchCode(name, branches.length + 1);

    const created = await supabaseStore.insertItem('branches', {
      _id: `b_${Date.now()}`,
      name: name.trim(),
      code: cleanCode,
      location: (location || 'Nepal').trim(),
      adminName: adminName.trim(),
      adminEmail: adminEmail.toLowerCase().trim(),
      adminPhone: adminPhone || '+977 9800000000',
      status: 'active',
      userLimit: userLimit !== undefined ? Number(userLimit) : 0,
      studentCapacity: Number(studentCapacity) || 100,
    });

    // Also create or update the Branch Admin user in Supabase Auth
    await supabaseAuthAdapter.signUp({
      name: adminName.trim(),
      email: adminEmail.toLowerCase().trim(),
      password: password || 'admin123',
      phone: adminPhone || '+977 9800000000',
      role: 'branch_admin',
      branch: name.trim(),
      branchCode: cleanCode,
      status: 'approved',
      subscription: 'premium',
      accessDurationDays: 365,
    }).catch(() => {});

    return NextResponse.json({ success: true, branch: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
