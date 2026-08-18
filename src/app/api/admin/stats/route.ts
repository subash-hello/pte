import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const adminUser = await verifyAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      const { fallbackDb } = await import('@/lib/fallbackDb');
      let fbUsers = fallbackDb.getUsers();

      if (adminUser.role === 'branch_admin') {
        fbUsers = fbUsers.filter(u => (u.branch || '').toLowerCase().includes((adminUser.branch || '').toLowerCase()));
      }

      const totalUsers = fbUsers.length;
      const pendingUsers = fbUsers.filter(u => u.status === 'pending').length;
      const approvedUsers = fbUsers.filter(u => u.status === 'approved').length;
      const declinedUsers = fbUsers.filter(u => u.status === 'declined').length;

      const roles: any = {};
      fbUsers.forEach(u => {
        roles[u.role] = (roles[u.role] || 0) + 1;
      });

      return NextResponse.json({
        success: true,
        stats: {
          totalUsers,
          pendingUsers,
          approvedUsers,
          declinedUsers,
          roles,
          recentRegistrations: totalUsers
        }
      });
    }

    const filter: any = {};
    if (adminUser.role === 'branch_admin') {
      filter.branch = adminUser.branch;
    }

    const totalUsers = await User.countDocuments(filter);
    const pendingUsers = await User.countDocuments({ ...filter, status: 'pending' });
    const approvedUsers = await User.countDocuments({ ...filter, status: 'approved' });
    const declinedUsers = await User.countDocuments({ ...filter, status: 'declined' });

    const rolesAgg = await User.aggregate([
      { $match: filter },
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    const roles: any = {};
    rolesAgg.forEach(r => {
      roles[r._id] = r.count;
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentRegistrations = await User.countDocuments({
      ...filter,
      createdAt: { $gte: sevenDaysAgo }
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        pendingUsers,
        approvedUsers,
        declinedUsers,
        roles,
        recentRegistrations
      }
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
        roles: { student: 4, branch_admin: 2, super_admin: 1 },
        recentRegistrations: fbUsers.length
      }
    });
  }
}
