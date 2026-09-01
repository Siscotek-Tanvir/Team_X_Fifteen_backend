import cors from "cors";
import express, { Request, Response } from "express";
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
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:5174",
      "https://cms-siscotek.vercel.app",
      "*",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// API v1 Routes
app.use("/api/v1", router);

// Direct endpoint aliases for convenience
app.use("/api/events", EventRoutes);
app.use("/events", EventRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/users", UserRoutes);

// Root / Health Check & API Directory
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Team X Fifteen API Server is running successfully!",
    // apiDirectory: {
    //   authentication: {
    //     register: "POST /api/v1/auth/register",
    //     login: "POST /api/v1/auth/login",
    //     changePassword: "POST /api/v1/auth/change-password (Authenticated)",
    //     me: "GET /api/v1/auth/me (Authenticated)",
    //   },
    //   userManagement: {
    //     note: "All user management routes require [admin] role with Bearer token in Authorization header",
    //     getAllUsers: "GET /api/v1/users?search=&role=&status=&department=&page=&limit=",
    //     getSingleUser: "GET /api/v1/users/:id",
    //     updateRole: "PATCH /api/v1/users/:id/role",
    //     updateStatus: "PATCH /api/v1/users/:id/status",
    //     updateUser: "PATCH /api/v1/users/:id",
    //     deleteUser: "DELETE /api/v1/users/:id",
    //     userStats: "GET /api/v1/users/stats",
    //   },
    //   events: {
    //     getAllEvents: "GET /api/v1/events (or /events, /api/events)",
    //     getSingleEvent: "GET /api/v1/events/:id",
    //     getFeaturedEvents: "GET /api/v1/events/featured",
    //     getCategories: "GET /api/v1/events/categories",
    //     getDepartments: "GET /api/v1/events/departments",
    //     getStats: "GET /api/v1/events/stats",
    //     createEvent: "POST /api/v1/events",
    //     updateEvent: "PATCH /api/v1/events/:id (or PUT)",
    //     deleteEvent: "DELETE /api/v1/events/:id",
    //     registerForEvent: "POST /api/v1/events/:id/register",
    //     seedEvents: "POST /api/v1/events/seed",
    //   },
    // },
  });
});

// Error handlers
app.use("*", routeError);
app.use(globalError);

export default app;
