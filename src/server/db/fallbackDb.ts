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
  // 1. Super Admin
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
    pteGoal: 90,
    targetScore: '90 (Superior C2)',
    subscription: 'premium',
    accessDurationDays: 365,
    approvedAt: new Date().toISOString(),
    tokenVersion: 1,
    xp: 3850,
    streak: 45,
    level: 10,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 150, xp: 3850, streak: 45, speaking: 90, writing: 90, reading: 90, listening: 90 },
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // 2. Branch Admins
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
    targetScore: '79+ (Proficient Plus C1)',
    subscription: 'premium',
    accessDurationDays: 365,
    approvedAt: new Date().toISOString(),
    tokenVersion: 1,
    xp: 2200,
    streak: 28,
    level: 7,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 88, xp: 2200, streak: 28, speaking: 82, writing: 80, reading: 85, listening: 84 },
    createdAt: new Date(Date.now() - 40 * 86400000).toISOString(),
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
    targetScore: '79+ (Proficient Plus C1)',
    subscription: 'premium',
    accessDurationDays: 365,
    approvedAt: new Date().toISOString(),
    tokenVersion: 1,
    xp: 2450,
    streak: 32,
    level: 8,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 95, xp: 2450, streak: 32, speaking: 86, writing: 84, reading: 85, listening: 88 },
    createdAt: new Date(Date.now() - 35 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // 3. Kathmandu Central Campus Students (8 candidates)
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
    targetScore: '79+ (GSE 79)',
    subscription: 'pro',
    accessDurationDays: 90,
    approvedAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    tokenVersion: 1,
    xp: 1850,
    streak: 18,
    level: 6,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 76, xp: 1850, streak: 18, speaking: 85, writing: 80, reading: 82, listening: 86 },
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
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
    targetScore: '65+ (GSE 65)',
    subscription: 'free',
    accessDurationDays: 30,
    approvedAt: null,
    tokenVersion: 1,
    xp: 450,
    streak: 4,
    level: 2,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 22, xp: 450, streak: 4, speaking: 64, writing: 66, reading: 62, listening: 65 },
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_05',
    id: 'student_05',
    name: 'Aayush Koirala',
    email: 'aayush.koirala@gmail.com',
    phone: '+977 9841889900',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'approved',
    branch: 'Kathmandu Central Campus',
    pteGoal: 79,
    targetScore: '79+ (GSE 79)',
    subscription: 'premium',
    accessDurationDays: 180,
    approvedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    tokenVersion: 1,
    xp: 1620,
    streak: 15,
    level: 5,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 64, xp: 1620, streak: 15, speaking: 82, writing: 78, reading: 80, listening: 83 },
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_06',
    id: 'student_06',
    name: 'Pratima Thapa',
    email: 'pratima.thapa@outlook.com',
    phone: '+977 9812998877',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'approved',
    branch: 'Kathmandu Central Campus',
    pteGoal: 90,
    targetScore: '90 (GSE 90)',
    subscription: 'premium',
    accessDurationDays: 365,
    approvedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    tokenVersion: 1,
    xp: 2950,
    streak: 29,
    level: 9,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 110, xp: 2950, streak: 29, speaking: 89, writing: 87, reading: 88, listening: 90 },
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_07',
    id: 'student_07',
    name: 'Suman Maharjan',
    email: 'suman.maharjan@yahoo.com',
    phone: '+977 9851044332',
    password: bcrypt.hashSync('student123', 10),
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
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 14, xp: 320, streak: 2, speaking: 60, writing: 62, reading: 58, listening: 61 },
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_08',
    id: 'student_08',
    name: 'Deepak Regmi',
    email: 'deepak.regmi@gmail.com',
    phone: '+977 9860114477',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'approved',
    branch: 'Kathmandu Central Campus',
    pteGoal: 79,
    targetScore: '79+ (GSE 79)',
    subscription: 'pro',
    accessDurationDays: 90,
    approvedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    tokenVersion: 1,
    xp: 1150,
    streak: 11,
    level: 4,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 48, xp: 1150, streak: 11, speaking: 78, writing: 76, reading: 77, listening: 80 },
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_09',
    id: 'student_09',
    name: 'Kripa Shrestha',
    email: 'kripa.shrestha@gmail.com',
    phone: '+977 9803112233',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'approved',
    branch: 'Kathmandu Central Campus',
    pteGoal: 79,
    targetScore: '79+ (GSE 79)',
    subscription: 'pro',
    accessDurationDays: 90,
    approvedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    tokenVersion: 1,
    xp: 1380,
    streak: 13,
    level: 5,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 56, xp: 1380, streak: 13, speaking: 80, writing: 77, reading: 79, listening: 82 },
    createdAt: new Date(Date.now() - 18 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_10',
    id: 'student_10',
    name: 'Roshan Dangol',
    email: 'roshan.dangol@outlook.com',
    phone: '+977 9849223344',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'approved',
    branch: 'Kathmandu Central Campus',
    pteGoal: 79,
    targetScore: '79+ (GSE 79)',
    subscription: 'premium',
    accessDurationDays: 365,
    approvedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    tokenVersion: 1,
    xp: 1740,
    streak: 16,
    level: 6,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 72, xp: 1740, streak: 16, speaking: 84, writing: 81, reading: 83, listening: 85 },
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // 4. Pokhara Regional Campus Students (5 candidates)
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
    targetScore: '79+ (GSE 79)',
    subscription: 'premium',
    accessDurationDays: 365,
    approvedAt: new Date(Date.now() - 18 * 86400000).toISOString(),
    tokenVersion: 1,
    xp: 2350,
    streak: 24,
    level: 8,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 96, xp: 2350, streak: 24, speaking: 84, writing: 81, reading: 83, listening: 86 },
    createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
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
    targetScore: '84+ (GSE 84)',
    subscription: 'free',
    accessDurationDays: 60,
    approvedAt: null,
    tokenVersion: 1,
    xp: 780,
    streak: 6,
    level: 3,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 38, xp: 780, streak: 6, speaking: 76, writing: 74, reading: 78, listening: 75 },
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_11',
    id: 'student_11',
    name: 'Manish Gurung',
    email: 'manish.gurung@gmail.com',
    phone: '+977 9856011223',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'approved',
    branch: 'Pokhara Regional Campus',
    pteGoal: 79,
    targetScore: '79+ (GSE 79)',
    subscription: 'pro',
    accessDurationDays: 90,
    approvedAt: new Date(Date.now() - 9 * 86400000).toISOString(),
    tokenVersion: 1,
    xp: 1490,
    streak: 14,
    level: 5,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 62, xp: 1490, streak: 14, speaking: 81, writing: 79, reading: 80, listening: 83 },
    createdAt: new Date(Date.now() - 16 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_12',
    id: 'student_12',
    name: 'Sweta Bastola',
    email: 'sweta.bastola@yahoo.com',
    phone: '+977 9817223344',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'approved',
    branch: 'Pokhara Regional Campus',
    pteGoal: 90,
    targetScore: '90 (GSE 90)',
    subscription: 'premium',
    accessDurationDays: 365,
    approvedAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    tokenVersion: 1,
    xp: 2800,
    streak: 28,
    level: 9,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 105, xp: 2800, streak: 28, speaking: 88, writing: 86, reading: 87, listening: 89 },
    createdAt: new Date(Date.now() - 28 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_13',
    id: 'student_13',
    name: 'Kiran Baral',
    email: 'kiran.baral@gmail.com',
    phone: '+977 9846055667',
    password: bcrypt.hashSync('student123', 10),
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
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 12, xp: 290, streak: 2, speaking: 58, writing: 60, reading: 57, listening: 59 },
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // 5. Chitwan & Lalitpur Campuses (3 candidates)
  {
    _id: 'student_14',
    id: 'student_14',
    name: 'Anuraj Phuyal',
    email: 'anuraj.phuyal@gmail.com',
    phone: '+977 9845012345',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'approved',
    branch: 'Chitwan Academic Centre',
    pteGoal: 79,
    targetScore: '79+ (GSE 79)',
    subscription: 'pro',
    accessDurationDays: 90,
    approvedAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    tokenVersion: 1,
    xp: 1250,
    streak: 12,
    level: 4,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 52, xp: 1250, streak: 12, speaking: 79, writing: 77, reading: 78, listening: 81 },
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_15',
    id: 'student_15',
    name: 'Nabin Silwal',
    email: 'nabin.silwal@outlook.com',
    phone: '+977 9855022334',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'approved',
    branch: 'Lalitpur Tech Branch',
    pteGoal: 79,
    targetScore: '79+ (GSE 79)',
    subscription: 'premium',
    accessDurationDays: 180,
    approvedAt: new Date(Date.now() - 11 * 86400000).toISOString(),
    tokenVersion: 1,
    xp: 1980,
    streak: 20,
    level: 7,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 82, xp: 1980, streak: 20, speaking: 83, writing: 81, reading: 82, listening: 85 },
    createdAt: new Date(Date.now() - 22 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'student_16',
    id: 'student_16',
    name: 'Sanjiv Maharjan',
    email: 'sanjiv.m@gmail.com',
    phone: '+977 9801998877',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    status: 'approved',
    branch: 'Lalitpur Tech Branch',
    pteGoal: 90,
    targetScore: '90 (GSE 90)',
    subscription: 'premium',
    accessDurationDays: 365,
    approvedAt: new Date(Date.now() - 16 * 86400000).toISOString(),
    tokenVersion: 1,
    xp: 3100,
    streak: 31,
    level: 10,
    loginAttempts: 0,
    lastLoginAt: new Date().toISOString(),
    progress: { completedCount: 125, xp: 3100, streak: 31, speaking: 90, writing: 88, reading: 89, listening: 90 },
    createdAt: new Date(Date.now() - 35 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Always ensure store has the full 16+ user dataset
global.fallbackUsersStore = defaultUsers;

export const fallbackDb = {
  getUsers: () => global.fallbackUsersStore || defaultUsers,
  
  findByEmail: (email: string) => {
    const users = global.fallbackUsersStore || defaultUsers;
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  
  findById: (id: string) => {
    const users = global.fallbackUsersStore || defaultUsers;
    return users.find(u => u.id === id || u._id === id);
  },

  createUser: async (userData: Partial<FallbackUser>) => {
    const users = global.fallbackUsersStore || [...defaultUsers];
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
      branch: userData.branch || 'Kathmandu Central Campus',
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
    const users = global.fallbackUsersStore || [...defaultUsers];
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
    const users = global.fallbackUsersStore || [...defaultUsers];
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
