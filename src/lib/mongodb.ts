import mongoose from 'mongoose';
import dns from 'dns';

// Fix Node.js DNS SRV resolution on Windows for mongodb+srv://
if (process.platform === 'win32') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
  } catch (e) {
    // Ignore DNS setServers error if restricted
  }
}

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.warn('⚠️ MONGODB_URI not defined in environment variables. Database features will be unavailable.');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    return null;
  }

  // If already connected, return
  if ((mongoose.connection.readyState as number) === 1) {
    return mongoose;
  }

  if (cached.conn && (mongoose.connection.readyState as number) === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Don't buffer if connection fails
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000, // Quick 5s timeout instead of hanging
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      console.log('✅ MongoDB Atlas connected successfully');
      
      // Auto-seed admin
      import('./seedAdmin').then(({ seedDefaultAdmin }) => {
        seedDefaultAdmin();
      }).catch(err => {
        console.error('Failed to run seed script:', err);
      });
      
      return m;
    }).catch((err) => {
      console.error('❌ MongoDB connection failed:', err.message);
      cached.promise = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    console.error('❌ MongoDB connection error:', e);
    return null;
  }

  return cached.conn;
}

export default connectToDatabase;
