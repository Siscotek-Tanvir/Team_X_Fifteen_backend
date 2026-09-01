// server.ts
import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);

import dotenv from "dotenv";
import { Server } from "http";
import app from "./app";
import { envConfig } from "./Configs/envConfig";
import { connectDB } from "./DB/connectDB";

dotenv.config();

const port = envConfig.port || 5000;

async function main() {
  try {
    // Connect to database and seed defaults
    await connectDB();

    // Start the local server
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