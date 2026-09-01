import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
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
      callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// Root / Health Check (does not require DB connection to respond immediately)
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Team X Fifteen API Server is running successfully!",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// Ensure MongoDB connection before processing any API route
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connectDB();
    next();
  } catch (err: any) {
    console.error("Database connection failure:", err);
    res.status(503).json({
      success: false,
      statusCode: 503,
      message:
        "Database connection failed. Please ensure DB_URL is configured on Vercel and IP Access 0.0.0.0/0 is enabled in MongoDB Atlas Network Access.",
      error: err?.message || err,
    });
  }
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
