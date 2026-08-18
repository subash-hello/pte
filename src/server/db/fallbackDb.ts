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

const defaultUsers: FallbackUser[] = [
  {
    _id: 'super_admin_01',
    id: 'super_admin_01',
    name: 'Super Admin',
    email: 'admin@ptemaster.com',
    phone: '+977 9800000000',
    password: bcrypt.hashSync('admin123', 10),
    role: 'super_admin',
    status: 'approved',
    branch: 'Central Headquarters',
    pteGoal: 79,
    subscription: 'premium',
    accessDurationDays: 365,
    approvedAt: new Date().toISOString(),
    tokenVersion: 1,
    xp: 2500,
    streak: 30,
    level: 10,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'branch_admin_01',
    id: 'branch_admin_01',
    name: 'Ramesh Sharma',
    email: 'ktm.admin@pteai.com',
    phone: '+977 9851012345',
    password: bcrypt.hashSync('admin123', 10),
    role: 'branch_admin',
    status: 'approved',
    branch: 'Kathmandu Central Campus',
    pteGoal: 79,
    subscription: 'premium',
    accessDurationDays: 365,
    approvedAt: new Date().toISOString(),
    tokenVersion: 1,
    xp: 1200,
    streak: 15,
    level: 5,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'branch_admin_02',
    id: 'branch_admin_02',
    name: 'Sita Sharma',
    email: 'pokhara.admin@pteai.com',
    phone: '+977 9856023456',
    password: bcrypt.hashSync('admin123', 10),
    role: 'branch_admin',
    status: 'approved',
    branch: 'Pokhara Regional Campus',
    pteGoal: 79,
    subscription: 'premium',
    accessDurationDays: 365,
    approvedAt: new Date().toISOString(),
    tokenVersion: 1,
    xp: 1850,
    streak: 22,
    level: 7,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_01',
    id: 'student_01',
    name: 'Subash Bhandari',
    email: 'subash.bhandari@pteai.com',
    phone: '+977 9841234567',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'approved',
    branch: 'Kathmandu Central Campus',
    pteGoal: 79,
    subscription: 'pro',
    accessDurationDays: 90,
    approvedAt: new Date().toISOString(),
    tokenVersion: 1,
    xp: 1420,
    streak: 14,
    level: 6,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_02',
    id: 'student_02',
    name: 'Pooja Adhikari',
    email: 'pooja.adhikari@gmail.com',
    phone: '+977 9813456789',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'pending',
    branch: 'Kathmandu Central Campus',
    pteGoal: 65,
    subscription: 'free',
    accessDurationDays: 30,
    approvedAt: null,
    tokenVersion: 1,
    xp: 420,
    streak: 3,
    level: 2,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_03',
    id: 'student_03',
    name: 'Bikash Shrestha',
    email: 'bikash.shrestha@gmail.com',
    phone: '+977 9801239876',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'approved',
    branch: 'Pokhara Regional Campus',
    pteGoal: 79,
    subscription: 'premium',
    accessDurationDays: 365,
    approvedAt: new Date().toISOString(),
    tokenVersion: 1,
    xp: 2150,
    streak: 21,
    level: 8,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 21 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_04',
    id: 'student_04',
    name: 'Anjali Karki',
    email: 'anjali.karki@outlook.com',
    phone: '+977 9846098765',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'pending',
    branch: 'Pokhara Regional Campus',
    pteGoal: 84,
    subscription: 'free',
    accessDurationDays: 60,
    approvedAt: null,
    tokenVersion: 1,
    xp: 680,
    streak: 5,
    level: 3,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

if (!global.fallbackUsersStore || global.fallbackUsersStore.length < 5) {
  global.fallbackUsersStore = defaultUsers;
}

export const fallbackDb = {
  getUsers: () => global.fallbackUsersStore || [],
  
  findByEmail: (email: string) => {
    const users = global.fallbackUsersStore || [];
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  
  findById: (id: string) => {
    const users = global.fallbackUsersStore || [];
    return users.find(u => u.id === id || u._id === id);
  },

  createUser: async (userData: Partial<FallbackUser>) => {
    const users = global.fallbackUsersStore || [];
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const hashedPassword = userData.password ? await bcrypt.hash(userData.password, 10) : '';

    const newUser: FallbackUser = {
      _id: id,
      id: id,
      name: userData.name || 'User',
      email: (userData.email || '').toLowerCase(),
      phone: userData.phone || '',
      password: hashedPassword,
      role: userData.role || 'student',
      status: userData.status || 'pending',
      branch: userData.branch || 'Kathmandu Main Campus',
      pteGoal: userData.pteGoal || 79,
      subscription: userData.subscription || 'free',
      accessDurationDays: userData.accessDurationDays || 30,
      approvedAt: userData.status === 'approved' ? new Date().toISOString() : null,
      tokenVersion: 1,
      xp: 0,
      streak: 0,
      level: 1,
      loginAttempts: 0,
      lastLoginAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.unshift(newUser);
    global.fallbackUsersStore = users;
    return newUser;
  },

  updateUser: (id: string, updates: Partial<FallbackUser>) => {
    const users = global.fallbackUsersStore || [];
    const index = users.findIndex(u => u.id === id || u._id === id);
    if (index !== -1) {
      if (updates.password && !updates.password.startsWith('$2a$') && !updates.password.startsWith('$2b$')) {
        updates.password = bcrypt.hashSync(updates.password, 10);
      }
      users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
      global.fallbackUsersStore = users;
      return users[index];
    }
    return null;
  },

  deleteUser: (id: string) => {
    const users = global.fallbackUsersStore || [];
    const filtered = users.filter(u => u.id !== id && u._id !== id);
    global.fallbackUsersStore = filtered;
    return true;
  },

  comparePassword: async (candidate: string, hash: string) => {
    return bcrypt.compare(candidate, hash);
  },

  generateToken: (user: FallbackUser) => {
    return jwt.sign(
      { id: user.id, role: user.role, tokenVersion: user.tokenVersion },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  }
};

export default fallbackDb;
