import dns from "node:dns";
import dotenv from "dotenv";
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { EventServices } from "./modules/events/event.service";
import { UserServices } from "./modules/user/user.service";

dotenv.config();

const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  console.error("Error: DB_URL is not defined in environment variables.");
  process.exit(1);
}

async function main() {
  try {
    dns.setServers(["1.1.1.1", "1.0.0.1"]);

    // Connect to MongoDB
    await mongoose.connect(dbUrl as string);
    console.log("Connected to MongoDB successfully.");

    // Auto-seed default admin user if no admin exists
    await UserServices.seedDefaultAdminUserIfEmpty();

    // Auto-seed initial events if collection is empty
    await EventServices.seedInitialEventsIfEmpty();

    // Start the server
    const server: Server = app.listen(port, () => {
      console.log(`🚀 App listening on http://localhost:${port}`);
    });

    const exitHandler = () => {
      if (server) {
        server.close(() => {
          console.log("Server closed.");
        });
      }
      process.exit(1);
    };

    const unexpectedErrorHandler = (error: unknown) => {
      console.error("Unexpected error:", error);
      exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);
  } catch (error) {
    console.error("Error during initialization:", error);
    process.exit(1);
  }
}

main();
