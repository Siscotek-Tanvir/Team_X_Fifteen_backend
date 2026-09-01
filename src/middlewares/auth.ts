import { NextFunction, Request, Response } from "express";
import { envConfig } from "../Configs/envConfig";
import { statusCodes } from "../Configs/StatusCode";
import AppError from "../ErrorHandlers/AppError";
import { verifyToken } from "../modules/auth/auth.utils";
import { IUser, IUserRole } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/user.model";

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

/**
 * Authentication and Role-based Authorization Middleware
 * Usage:
 *  - auth() -> Requires valid logged in user
 *  - auth("admin") -> Requires role 'admin'
 *  - auth("admin", "moderator") -> Requires role 'admin' or 'moderator'
 */
const auth = (...requiredRoles: IUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new AppError(statusCodes.unAuthorized, "You are not authorized! Token is missing.");
      }

      // Extract token from Bearer prefix if present
      const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

      if (!token) {
        throw new AppError(statusCodes.unAuthorized, "You are not authorized! Invalid token format.");
      }

      // Verify token
      let decoded: any;
      try {
        decoded = verifyToken(token, envConfig.jwtSecret);
      } catch (err: any) {
        throw new AppError(statusCodes.unAuthorized, err.message || "Invalid or expired token.");
      }

      const { email } = decoded;

      // Check if user exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new AppError(statusCodes.notFound, "User account not found or has been deleted.");
      }

      // Check account status
      if (user.status === "blocked") {
        throw new AppError(statusCodes.forbidden, "Access denied: Your account has been blocked by an administrator.");
      }

      // Check role authorization
      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        throw new AppError(
          statusCodes.forbidden,
          `Access forbidden: Requires [${requiredRoles.join(", ")}] role, but your role is '${user.role}'.`
        );
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
