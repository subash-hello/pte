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
    await connectToDatabase();

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
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
