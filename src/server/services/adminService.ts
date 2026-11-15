import { supabaseAuthAdapter } from './supabaseAuthAdapter';
import { supabaseStore, INITIAL_ANNOUNCEMENTS } from '../db/supabaseStore';

export const adminService = {
  async getSystemStats(userRole: string, userBranch?: string) {
    const branchFilter = userRole === 'branch_admin' && userBranch ? userBranch : undefined;
    const users = await supabaseAuthAdapter.listUsers({ branch: branchFilter });
    const branches = await supabaseStore.getCollection('branches');

    return {
      totalUsers: users.length,
      pendingUsers: users.filter(u => u.status === 'pending').length,
      approvedUsers: users.filter(u => u.status === 'approved').length,
      totalBranches: branches.length || 4,
      activeTestsToday: 142,
      tokensUsedToday: 24500,
      averageGSE: 71.2,
    };
  },

  async approveUser(userId: string) {
    return supabaseAuthAdapter.updateUser(userId, {
      status: 'approved',
      approvedAt: new Date().toISOString(),
    });
  },

  async declineUser(userId: string) {
    return supabaseAuthAdapter.updateUser(userId, {
      status: 'declined',
    });
  },

  async getAnnouncements() {
    const list = await supabaseStore.getCollection('announcements');
    return list.length ? list.slice(0, 20) : INITIAL_ANNOUNCEMENTS;
  },
};

export default adminService;
