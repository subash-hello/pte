import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function seedDefaultAdmin() {
  try {
    await connectToDatabase();
    
    const adminExists = await User.findOne({ role: 'super_admin' });
    if (!adminExists) {
      const superAdmin = new User({
        name: 'Super Admin',
        email: 'admin@ptemaster.com',
        password: 'admin123',
        role: 'super_admin',
        status: 'approved',
        approvedAt: new Date(),
        branch: 'Main Campus'
      });
      await superAdmin.save();
      console.log('✅ Default super admin created: admin@ptemaster.com / admin123');
    }
  } catch (error) {
    console.error('❌ Error seeding default admin:', error);
  }
}
