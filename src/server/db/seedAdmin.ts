import { connectDB } from './mongodb';
import User from '../models/User';

export async function seedDefaultAdmin() {
  try {
    const db = await connectDB();
    if (!db) return;
    
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
        pteGoal: 79,
        subscription: 'premium',
        accessDurationDays: 365,
        xp: 2500,
        streak: 30,
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
        xp: 1200,
        streak: 15,
        level: 5
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
        xp: 1850,
        streak: 22,
        level: 7
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
        xp: 1420,
        streak: 14,
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
        xp: 420,
        streak: 3,
        level: 2
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
        xp: 2150,
        streak: 21,
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
        xp: 680,
        streak: 5,
        level: 3
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
