export * from '@/server/db/mongodb';
export { default } from '@/server/db/mongodb';

// Backward compatibility alias
export { connectDB as connectToDatabase } from '@/server/db/mongodb';
