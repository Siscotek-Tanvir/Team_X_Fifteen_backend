import express, { Request, Response } from "express";
import globalError from "./ErrorHandlers/GlobalError";
import { routeError } from "./ErrorHandlers/RouteError";
import cors from "cors";
import router from "./Router";

const app = express();

// Parsers
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: ["http://localhost:3000", "https://cms-siscotek.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.options("*", cors()); 

// Routes
app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response, next) => {
  try {
    res.send("Server is running!");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Error handlers
app.use("*", routeError);
app.use(globalError);

export default app;
