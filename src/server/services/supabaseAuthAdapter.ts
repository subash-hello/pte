import { supabaseAdmin } from '../db/supabase';

export interface SupabaseUserMetadata {
  name: string;
  phone?: string;
  role: 'student' | 'branch_admin' | 'super_admin';
  status: 'pending' | 'approved' | 'declined';
  branch: string;
  branchCode?: string;
  examDate?: string;
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
  lastLoginAt?: string | null;
  progress?: {
    completedCount?: number;
    xp?: number;
    streak?: number;
    speaking?: number;
    writing?: number;
    reading?: number;
    listening?: number;
    [key: string]: any;
  };
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
  branchCode?: string;
  examDate?: string;
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
  lastLoginAt?: string | null;
  progress?: {
    completedCount?: number;
    xp?: number;
    streak?: number;
    speaking?: number;
    writing?: number;
    reading?: number;
    listening?: number;
    [key: string]: any;
  };
  createdAt?: string;
  updatedAt?: string;
}

// In-memory cache for temporary reset codes
const resetCodeStore = new Map<string, { code: string; expiresAt: number }>();

// Cache to prevent duplicate seeding
let isSeeded = false;

// Only the real Super Admin account is seeded
export const DEFAULT_SEED_ACCOUNTS: {
  email: string;
  password: string;
  metadata: SupabaseUserMetadata;
}[] = [
  {
    email: 'admin@pte.ai',
    password: 'adminpass123',
    metadata: {
      name: 'Super Admin',
      phone: '+977 9763876490',
      role: 'super_admin',
      status: 'approved',
      branch: 'Central Headquarters',
      pteGoal: 90,
      targetScore: '90 (Superior C2)',
      subscription: 'premium',
      accessDurationDays: 365,
      tokenVersion: 1,
      xp: 0,
      streak: 1,
      level: 10,
      progress: { completedCount: 0, xp: 0, streak: 1, speaking: 90, writing: 90, reading: 90, listening: 90 },
    },
  },
];

// Normalize Supabase Auth user into standard platform user
export function formatSupabaseUser(user: any): AdaptedUser {
  const meta: SupabaseUserMetadata = user.user_metadata || {};
  const xp = meta.xp !== undefined ? Number(meta.xp) : 0;
  const streak = meta.streak !== undefined ? Number(meta.streak) : 1;
  return {
    id: user.id,
    _id: user.id,
    email: (user.email || '').toLowerCase().trim(),
    name: meta.name || user.email?.split('@')[0] || 'Candidate',
    phone: meta.phone || '',
    role: meta.role || 'student',
    status: meta.status || 'pending',
    branch: meta.branch || 'Direct Enrollment',
    branchCode: meta.branchCode || '',
    examDate: meta.examDate || '',
    pteGoal: Number(meta.pteGoal) || 79,
    targetScore: meta.targetScore || '79+ (GSE 79)',
    subscription: meta.subscription || 'free',
    accessDurationDays: Number(meta.accessDurationDays) || 30,
    approvedAt: meta.status === 'pending' ? null : (meta.approvedAt || user.created_at),
    tokenVersion: Number(meta.tokenVersion) || 1,
    xp,
    streak,
    level: Number(meta.level) || 1,
    lastActive: meta.lastActive || new Date().toISOString(),
    lastLoginAt: meta.lastLoginAt || meta.lastActive || user.last_sign_in_at || user.created_at,
    progress: meta.progress || {
      completedCount: Math.round(xp / 25),
      xp,
      streak,
      speaking: 0,
      writing: 0,
      reading: 0,
      listening: 0,
    },
    createdAt: user.created_at,
    updatedAt: user.updated_at || user.created_at,
  };
}

export const supabaseAuthAdapter = {
  /**
   * Ensure only the primary Super Admin (admin@pte.ai) exists in Supabase Auth
   */
  async seedInitialUsers() {
    if (isSeeded) return;
    isSeeded = true;

    try {
      const { data: existingList } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
      const existingByEmail = new Map(
        (existingList?.users || []).map(u => [(u.email || '').toLowerCase(), u])
      );

      for (const acc of DEFAULT_SEED_ACCOUNTS) {
        const lowerEmail = acc.email.toLowerCase();
        if (!existingByEmail.has(lowerEmail)) {
          await supabaseAdmin.auth.admin.createUser({
            email: acc.email,
            password: acc.password,
            email_confirm: true,
            user_metadata: acc.metadata,
          });
        }
      }
    } catch (e) {
      console.warn('Supabase initial admin check:', e);
    }
  },

  /**
   * Strictly authenticate user with Email & Password via Supabase Auth
   */
  async signIn(email: string, pass: string): Promise<{ success: boolean; user?: AdaptedUser; error?: string }> {
    await this.seedInitialUsers();

    const normalizedEmail = email.toLowerCase().trim();
    const candidatePass = pass.trim();

    try {
      const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
        email: normalizedEmail,
        password: candidatePass,
      });

      if (!authError && authData?.user) {
        const adapted = formatSupabaseUser(authData.user);
        return { success: true, user: adapted };
      }

      return {
        success: false,
        error: authError?.message || 'Invalid credentials. Please verify your email and password.',
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Invalid credentials. Please verify your email and password.',
      };
    }
  },

  /**
   * Register new user in Supabase Auth
   */
  async signUp(params: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    branch?: string;
    branchCode?: string;
    examDate?: string;
    pteGoal?: number;
    targetScore?: string;
    role?: 'student' | 'branch_admin' | 'super_admin';
    status?: 'pending' | 'approved' | 'declined';
    accessDurationDays?: number;
    subscription?: 'free' | 'pro' | 'premium';
  }): Promise<{ success: boolean; user?: AdaptedUser; error?: string }> {
    await this.seedInitialUsers();

    const normalizedEmail = params.email.toLowerCase().trim();

    try {
      const existing = await this.getUserByEmail(normalizedEmail);
      if (existing) {
        return { success: false, error: 'An account with this email address already exists.' };
      }

      const metadata: SupabaseUserMetadata = {
        name: params.name.trim(),
        phone: params.phone?.trim() || '',
        role: params.role || 'student',
        status: params.status || 'pending',
        branch: params.branch || 'Direct Enrollment',
        branchCode: params.branchCode || '',
        examDate: params.examDate || '',
        pteGoal: Number(params.pteGoal) || 79,
        targetScore: params.targetScore || `${params.pteGoal || 79}+ (GSE ${params.pteGoal || 79})`,
        subscription: params.subscription || 'free',
        accessDurationDays: params.accessDurationDays || 30,
        tokenVersion: 1,
        xp: 0,
        streak: 1,
        level: 1,
        approvedAt: params.status === 'approved' ? new Date().toISOString() : null,
        progress: { completedCount: 0, xp: 0, streak: 1, speaking: 0, writing: 0, reading: 0, listening: 0 },
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
      const { data } = await supabaseAdmin.auth.admin.listUsers({ perPage: 500 });
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

      if (updates.email) {
        payload.email = updates.email.toLowerCase().trim();
      }
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
   * List all users from Supabase with optional role/branch/status/search filters
   */
  async listUsers(filter?: { role?: string; branch?: string; status?: string; search?: string }): Promise<AdaptedUser[]> {
    await this.seedInitialUsers();

    try {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ perPage: 500 });
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
      if (filter?.search) {
        const q = filter.search.toLowerCase();
        list = list.filter(
          u =>
            (u.name || '').toLowerCase().includes(q) ||
            (u.email || '').toLowerCase().includes(q) ||
            (u.phone || '').includes(q)
        );
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
    const expiresAt = Date.now() + 15 * 60 * 1000;
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
  },
};

export default supabaseAuthAdapter;
