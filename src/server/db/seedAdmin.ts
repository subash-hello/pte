import { connectDB } from './mongodb';
import User from '../models/User';
import Branch from '../models/Branch';

export async function seedDefaultAdmin() {
  try {
    const db = await connectDB();
    if (!db) return;
    
    // 1. Seed Real Campuses
    const seedBranches = [
      {
        name: 'Kathmandu Central Campus',
        location: 'Putalisadak, Kathmandu',
        adminName: 'Ramesh Sharma',
        adminEmail: 'ktm.admin@pteai.com',
        adminPhone: '+977 9851012345',
        status: 'active',
        studentCapacity: 150,
      },
      {
        name: 'Pokhara Regional Campus',
        location: 'Chipledhunga, Pokhara',
        adminName: 'Sita Sharma',
        adminEmail: 'pokhara.admin@pteai.com',
        adminPhone: '+977 9856023456',
        status: 'active',
        studentCapacity: 100,
      },
      {
        name: 'Lalitpur Tech Branch',
        location: 'Kumaripati, Lalitpur',
        adminName: 'Nabin Silwal',
        adminEmail: 'lalitpur.admin@pteai.com',
        adminPhone: '+977 9855022334',
        status: 'active',
        studentCapacity: 80,
      },
      {
        name: 'Chitwan Academic Centre',
        location: 'Lions Chowk, Bharatpur',
        adminName: 'Anuraj Phuyal',
        adminEmail: 'chitwan.admin@pteai.com',
        adminPhone: '+977 9845012345',
        status: 'active',
        studentCapacity: 60,
      },
    ];

    for (const b of seedBranches) {
      const exists = await Branch.findOne({ name: b.name });
      if (!exists) {
        const branchDoc = new Branch(b);
        await branchDoc.save();
      }
    }

    // 2. Seed Real Users & Candidates
    const seedUsers = [
      {
        name: 'Super Admin',
        email: 'admin@ptemaster.com',
        phone: '+977 9800000000',
        password: 'admin123',
        role: 'super_admin',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Central Headquarters',
        pteGoal: 90,
        subscription: 'premium',
        accessDurationDays: 365,
        xp: 3850,
        streak: 45,
        level: 10
      },
      {
        name: 'Ramesh Sharma',
        email: 'ktm.admin@pteai.com',
        phone: '+977 9851012345',
        password: 'admin123',
        role: 'branch_admin',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Kathmandu Central Campus',
        pteGoal: 79,
        subscription: 'premium',
        accessDurationDays: 365,
        xp: 2200,
        streak: 28,
        level: 7
      },
      {
        name: 'Sita Sharma',
        email: 'pokhara.admin@pteai.com',
        phone: '+977 9856023456',
        password: 'admin123',
        role: 'branch_admin',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Pokhara Regional Campus',
        pteGoal: 79,
        subscription: 'premium',
        accessDurationDays: 365,
        xp: 2450,
        streak: 32,
        level: 8
      },
      {
        name: 'Subash Bhandari',
        email: 'subash.bhandari@pteai.com',
        phone: '+977 9841234567',
        password: 'student123',
        role: 'student',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Kathmandu Central Campus',
        pteGoal: 79,
        subscription: 'pro',
        accessDurationDays: 90,
        xp: 1850,
        streak: 18,
        level: 6
      },
      {
        name: 'Pooja Adhikari',
        email: 'pooja.adhikari@gmail.com',
        phone: '+977 9813456789',
        password: 'student123',
        role: 'student',
        status: 'pending',
        approvedAt: null,
        branch: 'Kathmandu Central Campus',
        pteGoal: 65,
        subscription: 'free',
        accessDurationDays: 30,
        xp: 450,
        streak: 4,
        level: 2
      },
      {
        name: 'Aayush Koirala',
        email: 'aayush.koirala@gmail.com',
        phone: '+977 9841889900',
        password: 'student123',
        role: 'student',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Kathmandu Central Campus',
        pteGoal: 79,
        subscription: 'premium',
        accessDurationDays: 180,
        xp: 1620,
        streak: 15,
        level: 5
      },
      {
        name: 'Pratima Thapa',
        email: 'pratima.thapa@outlook.com',
        phone: '+977 9812998877',
        password: 'student123',
        role: 'student',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Kathmandu Central Campus',
        pteGoal: 90,
        subscription: 'premium',
        accessDurationDays: 365,
        xp: 2950,
        streak: 29,
        level: 9
      },
      {
        name: 'Suman Maharjan',
        email: 'suman.maharjan@yahoo.com',
        phone: '+977 9851044332',
        password: 'student123',
        role: 'student',
        status: 'pending',
        approvedAt: null,
        branch: 'Kathmandu Central Campus',
        pteGoal: 65,
        subscription: 'free',
        accessDurationDays: 30,
        xp: 320,
        streak: 2,
        level: 2
      },
      {
        name: 'Deepak Regmi',
        email: 'deepak.regmi@gmail.com',
        phone: '+977 9860114477',
        password: 'student123',
        role: 'student',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Kathmandu Central Campus',
        pteGoal: 79,
        subscription: 'pro',
        accessDurationDays: 90,
        xp: 1150,
        streak: 11,
        level: 4
      },
      {
        name: 'Kripa Shrestha',
        email: 'kripa.shrestha@gmail.com',
        phone: '+977 9803112233',
        password: 'student123',
        role: 'student',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Kathmandu Central Campus',
        pteGoal: 79,
        subscription: 'pro',
        accessDurationDays: 90,
        xp: 1380,
        streak: 13,
        level: 5
      },
      {
        name: 'Bikash Shrestha',
        email: 'bikash.shrestha@gmail.com',
        phone: '+977 9801239876',
        password: 'student123',
        role: 'student',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Pokhara Regional Campus',
        pteGoal: 79,
        subscription: 'premium',
        accessDurationDays: 365,
        xp: 2350,
        streak: 24,
        level: 8
      },
      {
        name: 'Anjali Karki',
        email: 'anjali.karki@outlook.com',
        phone: '+977 9846098765',
        password: 'student123',
        role: 'student',
        status: 'pending',
        approvedAt: null,
        branch: 'Pokhara Regional Campus',
        pteGoal: 84,
        subscription: 'free',
        accessDurationDays: 60,
        xp: 780,
        streak: 6,
        level: 3
      },
      {
        name: 'Manish Gurung',
        email: 'manish.gurung@gmail.com',
        phone: '+977 9856011223',
        password: 'student123',
        role: 'student',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Pokhara Regional Campus',
        pteGoal: 79,
        subscription: 'pro',
        accessDurationDays: 90,
        xp: 1490,
        streak: 14,
        level: 5
      },
      {
        name: 'Anuraj Phuyal',
        email: 'anuraj.phuyal@gmail.com',
        phone: '+977 9845012345',
        password: 'student123',
        role: 'student',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Chitwan Academic Centre',
        pteGoal: 79,
        subscription: 'pro',
        accessDurationDays: 90,
        xp: 1250,
        streak: 12,
        level: 4
      },
      {
        name: 'Nabin Silwal',
        email: 'nabin.silwal@outlook.com',
        phone: '+977 9855022334',
        password: 'student123',
        role: 'student',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Lalitpur Tech Branch',
        pteGoal: 79,
        subscription: 'premium',
        accessDurationDays: 180,
        xp: 1980,
        streak: 20,
        level: 7
      },
      {
        name: 'Sanjiv Maharjan',
        email: 'sanjiv.m@gmail.com',
        phone: '+977 9801998877',
        password: 'student123',
        role: 'student',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Lalitpur Tech Branch',
        pteGoal: 90,
        subscription: 'premium',
        accessDurationDays: 365,
        xp: 3100,
        streak: 31,
        level: 10
      }
    ];

    for (const u of seedUsers) {
      const exists = await User.findOne({ email: u.email.toLowerCase() });
      if (!exists) {
        const user = new User(u);
        await user.save();
      }
    }
  } catch (error) {
    console.error('❌ Error seeding default users in MongoDB:', error);
  }
}

export default seedDefaultAdmin;
