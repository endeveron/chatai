import mongoose from 'mongoose';
import { logger } from '@/lib/utils/logger';

const connectionString = process.env.MONGODB_CONNECTION_STRING as string;
if (!connectionString) logger.r('Invalid/Missing MONGODB_CONNECTION_STRING');

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { connection: null, promise: null };

const connectOptions = {
  bufferCommands: false,
};

/**
 * Connects to a MongoDB database using the provided connection string.
 */
export const connectToDB = async (): Promise<void> => {
  if (cached.connection) return;
  try {
    // mongoose.set('strictQuery', true);

    // If the connection has not been established yet, assign the connection promise to `global._mongoose.promise`.
    // This ensures that the connection is only established once and subsequent calls to `connectToDB()` will not create multiple connections.
    if (!cached.promise) {
      cached.promise = mongoose.connect(connectionString, connectOptions);
    }

    // If the connection has been established, assign the connection to `global._mongoose.connection`
    cached.connection = await cached.promise;
    // logger.g('Connected to MongoDB');
    console.log('Connected to DB');
  } catch (err) {
    cached.promise = null;
    // logger.r('MongoDB connection error', err);
    console.error('DB connection error', err);
  }
};
