import mongoose from "mongoose";
import { envConfig } from "../Configs/envConfig";
import { EventServices } from "../modules/events/event.service";
import { UserServices } from "../modules/user/user.service";

/**
 * Global cache for serverless environments (Vercel)
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  const dbUrl = envConfig.dbUrl || process.env.DB_URL;

  if (!dbUrl) {
    throw new Error(
      "DB_URL is missing. Please set DB_URL in your Vercel Project Environment Variables."
    );
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: true,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(dbUrl, opts).then(async (m) => {
      console.log("Connected to MongoDB Atlas successfully.");
      try {
        // Auto-seed defaults in background
        UserServices.seedDefaultAdminUserIfEmpty().catch(() => {});
        EventServices.seedInitialEventsIfEmpty().catch(() => {});
      } catch (err) {
        console.warn("Seeding notice:", err);
      }
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
};
