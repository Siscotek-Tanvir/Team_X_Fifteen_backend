import dotenv from "dotenv";
dotenv.config();

const productionType = process.env.NODE_ENV || "development";
const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL;
const jwtSecret = process.env.JWT_ACCESS_SECRET || "team_x_fifteen_super_secret_jwt_key_2026_eastdelta";
const jwtExpiresIn = process.env.JWT_TOKEN_EXPIRES_IN || "7d";
const adminEmail = process.env.ADMIN_EMAIL || "admin@eastdelta.edu.bd";
const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123456";

export const envConfig = {
  productionType,
  port,
  dbUrl,
  jwtSecret,
  jwtExpiresIn,
  adminEmail,
  adminPassword,
};
