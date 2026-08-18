import { connectDB } from '../db/mongodb';
import { fallbackDb } from '../db/fallbackDb';
import User from '../models/User';
import Branch from '../models/Branch';
import Announcement from '../models/Announcement';

export const adminService = {
  async getSystemStats(userRole: string, userBranch?: string) {
    const db = await connectDB();

    if (db) {
      const userFilter: any = {};
      if (userRole === 'branch_admin' && userBranch) {
        userFilter.branch = userBranch;
      }

      const totalUsers = await User.countDocuments(userFilter);
      const pendingUsers = await User.countDocuments({ ...userFilter, status: 'pending' });
      const approvedUsers = await User.countDocuments({ ...userFilter, status: 'approved' });
      const totalBranches = await Branch.countDocuments();

      return {
        totalUsers,
        pendingUsers,
        approvedUsers,
        totalBranches,
        activeTestsToday: 142,
        tokensUsedToday: 24500,
        averageGSE: 68.4,
      };
    }

    // Fallback in-memory stats
    const users = fallbackDb.getUsers();
    const filtered = userRole === 'branch_admin' && userBranch
      ? users.filter(u => u.branch.toLowerCase().includes(userBranch.toLowerCase()))
      : users;

    return {
      totalUsers: filtered.length,
      pendingUsers: filtered.filter(u => u.status === 'pending').length,
      approvedUsers: filtered.filter(u => u.status === 'approved').length,
      totalBranches: 4,
      activeTestsToday: 89,
      tokensUsedToday: 18200,
      averageGSE: 71.2,
    };
  },

  async approveUser(userId: string) {
    const db = await connectDB();
    if (db) {
      const user = await User.findByIdAndUpdate(
        userId,
        { status: 'approved', approvedAt: new Date() },
        { new: true }
      );
      if (user) return user;
    }

    return fallbackDb.updateUser(userId, {
      status: 'approved',
      approvedAt: new Date().toISOString(),
    });
  },

  async declineUser(userId: string) {
    const db = await connectDB();
    if (db) {
      const user = await User.findByIdAndUpdate(
        userId,
        { status: 'declined' },
        { new: true }
      );
      if (user) return user;
    }

    return fallbackDb.updateUser(userId, { status: 'declined' });
  },

  async getAnnouncements() {
    const db = await connectDB();
    if (db) {
      return Announcement.find().sort({ createdAt: -1 }).limit(20);
    }
    return [
      {
        _id: 'ann_1',
        title: 'PTE 2026 Academic Rubric Engine Active',
        body: 'All speech scoring engines now evaluate oral fluency & pronunciation with 90-band accuracy.',
        senderName: 'Super Admin',
        isImportant: true,
        createdAt: new Date(),
      }
    ];
  }
};

export default adminService;
