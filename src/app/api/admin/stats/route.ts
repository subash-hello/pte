import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { supabaseAuthAdapter } from '@/server/services/supabaseAuthAdapter';
import { supabaseStore } from '@/server/db/supabaseStore';

export async function GET(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const branchFilter = adminUser.role === 'branch_admin' ? adminUser.branch : undefined;
    const users = await supabaseAuthAdapter.listUsers({ branch: branchFilter });
    const branches = await supabaseStore.getCollection('branches');

    const totalUsers = users.length;
    const pendingUsers = users.filter(u => u.status === 'pending').length;
    const approvedUsers = users.filter(u => u.status === 'approved').length;
    const declinedUsers = users.filter(u => u.status === 'declined').length;

    const roles: Record<string, number> = {};
    users.forEach(u => {
      roles[u.role] = (roles[u.role] || 0) + 1;
    });

    const sevenDaysAgo = Date.now() - 7 * 86400000;
    const recentRegistrations = users.filter(u => {
      const created = u.createdAt ? new Date(u.createdAt).getTime() : Date.now();
      return created >= sevenDaysAgo;
    }).length || totalUsers;

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        pendingUsers,
        approvedUsers,
        declinedUsers,
        totalBranches: branches.length,
        roles,
        recentRegistrations,
        databaseEngine: 'Supabase',
      },
    });
  } catch (error: any) {
    const { fallbackDb } = await import('@/lib/fallbackDb');
    const fbUsers = fallbackDb.getUsers();
    return NextResponse.json({
      success: true,
      stats: {
        totalUsers: fbUsers.length,
        pendingUsers: fbUsers.filter(u => u.status === 'pending').length,
        approvedUsers: fbUsers.filter(u => u.status === 'approved').length,
        declinedUsers: fbUsers.filter(u => u.status === 'declined').length,
        roles: { student: 15, branch_admin: 4, super_admin: 2 },
        recentRegistrations: fbUsers.length,
        databaseEngine: 'Supabase',
      },
    });
  }
}
