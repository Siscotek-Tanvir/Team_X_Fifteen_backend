import dns from "node:dns";
import mongoose from "mongoose";
import { envConfig } from "../Configs/envConfig";
import { EventServices } from "../modules/events/event.service";
import { UserServices } from "../modules/user/user.service";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  const dbUrl = envConfig.dbUrl;
  if (!dbUrl) {
    console.error("Warning: DB_URL is not defined in environment variables.");
    return;
  }

  try {
    dns.setServers(["1.1.1.1", "1.0.0.1"]);
    await mongoose.connect(dbUrl);
    isConnected = true;
    console.log("Connected to MongoDB successfully.");

    // Auto-seed default admin and default events if needed
    await UserServices.seedDefaultAdminUserIfEmpty();
    await EventServices.seedInitialEventsIfEmpty();
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
