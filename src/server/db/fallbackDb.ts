import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'pte-master-ai-production-jwt-secret-2026-x9k4m7qz';

export interface FallbackUser {
  _id: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'student' | 'branch_admin' | 'super_admin';
  status: 'pending' | 'approved' | 'declined';
  branch: string;
  pteGoal: number;
  subscription: 'free' | 'pro' | 'premium';
  accessDurationDays: number;
  approvedAt: Date | string | null;
  tokenVersion: number;
  xp: number;
  streak: number;
  level: number;
  loginAttempts: number;
  lastLoginAt: Date | string | null;
  targetScore?: string;
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
  createdAt: Date | string;
  updatedAt: Date | string;
}

declare global {
  // eslint-disable-next-line no-var
  var fallbackUsersStore: FallbackUser[] | undefined;
}

// Only the real Super Admin account (admin@pte.ai / adminpass123)
const defaultUsers: FallbackUser[] = [
  {
    _id: '2def59c8-4884-4829-b116-bafd8d7de56e',
    id: '2def59c8-4884-4829-b116-bafd8d7de56e',
    name: 'Super Admin',
    email: 'admin@pte.ai',
    phone: '+977 9763876490',
    password: bcrypt.hashSync('adminpass123', 10),
    role: 'super_admin',
    status: 'approved',
    branch: 'Central Headquarters',
    pteGoal: 90,
    targetScore: '90 (Superior C2)',
    subscription: 'premium',
    accessDurationDays: 365,
    approvedAt: new Date().toISOString(),
    tokenVersion: 1,
    xp: 0,
    streak: 1,
    level: 10,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 0, xp: 0, streak: 1, speaking: 90, writing: 90, reading: 90, listening: 90 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function getStore(): FallbackUser[] {
  if (!global.fallbackUsersStore) {
    global.fallbackUsersStore = [...defaultUsers];
  }
  return global.fallbackUsersStore;
}

export const fallbackDb = {
  getUsers(filter?: { role?: string; branch?: string; status?: string; search?: string }): FallbackUser[] {
    let list = [...getStore()];
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
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.phone || '').includes(q)
      );
    }
    return list;
  },

  findByEmail(email: string): FallbackUser | undefined {
    const clean = email.toLowerCase().trim();
    return getStore().find(u => u.email.toLowerCase() === clean);
  },

  findById(id: string): FallbackUser | undefined {
    return getStore().find(u => u.id === id || u._id === id);
  },

  createUser(data: Partial<FallbackUser>): FallbackUser {
    const store = getStore();
    const id = data.id || data._id || `usr_${Date.now()}`;
    const rawPass = data.password || 'student123';
    const hashedPassword = rawPass.startsWith('$2') ? rawPass : bcrypt.hashSync(rawPass, 10);

    const newUser: FallbackUser = {
      _id: id,
      id,
      name: data.name || 'Candidate',
      email: (data.email || '').toLowerCase().trim(),
      phone: data.phone || '',
      password: hashedPassword,
      role: data.role || 'student',
      status: data.status || 'pending',
      branch: data.branch || 'Direct Enrollment',
      pteGoal: Number(data.pteGoal) || 79,
      targetScore: data.targetScore || '79+ (GSE 79)',
      subscription: data.subscription || 'free',
      accessDurationDays: Number(data.accessDurationDays) || 30,
      approvedAt: data.status === 'approved' ? new Date().toISOString() : null,
      tokenVersion: 1,
      xp: Number(data.xp) || 0,
      streak: Number(data.streak) || 1,
      level: Number(data.level) || 1,
      loginAttempts: 0,
      lastLoginAt: new Date().toISOString(),
      progress: data.progress || { completedCount: 0, xp: 0, streak: 1, speaking: 0, writing: 0, reading: 0, listening: 0 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.unshift(newUser);
    return newUser;
  },

  updateUser(id: string, updates: Partial<FallbackUser>): FallbackUser | null {
    const store = getStore();
    const index = store.findIndex(u => u.id === id || u._id === id);
    if (index === -1) return null;

    const updated = {
      ...store[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (updates.password && !updates.password.startsWith('$2')) {
      updated.password = bcrypt.hashSync(updates.password, 10);
    }

    store[index] = updated;
    return updated;
  },

  deleteUser(id: string): boolean {
    const store = getStore();
    const index = store.findIndex(u => u.id === id || u._id === id);
    if (index === -1) return false;
    store.splice(index, 1);
    return true;
  },

  async comparePassword(plain: string, hashed: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plain, hashed);
    } catch {
      return plain === hashed;
    }
  },

  generateToken(user: FallbackUser): string {
    return jwt.sign(
      { id: user.id, role: user.role, tokenVersion: user.tokenVersion || 1 },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  },
};

export default fallbackDb;
