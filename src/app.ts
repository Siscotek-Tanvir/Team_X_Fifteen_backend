import cors from "cors";
import express, { Request, Response } from "express";
import { connectDB } from "./DB/connectDB";
import globalError from "./ErrorHandlers/GlobalError";
import { routeError } from "./ErrorHandlers/RouteError";
import router from "./Router";
import { AuthRoutes } from "./modules/auth/auth.route";
import { EventRoutes } from "./modules/events/event.route";
import { UserRoutes } from "./modules/user/user.route";

const app = express();

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server) or from any origin
      callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// Ensure MongoDB is connected for serverless invocations
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection error in middleware:", err);
  }
  next();
});

// Root / Health Check
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Team X Fifteen API Server is running successfully!",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// API v1 Routes
app.use("/api/v1", router);

// Direct endpoint aliases for convenience
app.use("/api/events", EventRoutes);
app.use("/events", EventRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/users", UserRoutes);

// Error handlers
app.use("*", routeError);
app.use(globalError);

export default app;
