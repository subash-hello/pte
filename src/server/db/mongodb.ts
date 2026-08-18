import mongoose from 'mongoose';
import { seedDefaultAdmin } from './seedAdmin';

const MONGODB_URI = process.env.MONGODB_URI;

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
  seeded: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: CachedConnection | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null, seeded: false };
}

export async function connectDB(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI not configured in environment.');
    return null;
  }

  if (cached!.conn && mongoose.connection.readyState === 1) {
    if (!cached!.seeded) {
      cached!.seeded = true;
      seedDefaultAdmin().catch(e => console.error('Error auto-seeding MongoDB:', e));
    }
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      maxPoolSize: 10,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts)
      .then(async (mongooseInstance) => {
        console.log('✅ Connected to MongoDB Atlas successfully');
        if (!cached!.seeded) {
          cached!.seeded = true;
          await seedDefaultAdmin().catch(e => console.error('Error auto-seeding MongoDB:', e));
        }
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn('⚠️ MongoDB Atlas connection error (fallback in use):', err.message);
        cached!.promise = null;
        return null;
      });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    return null;
  }

  return cached!.conn;
}

export default connectDB;
