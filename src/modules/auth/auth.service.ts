import { envConfig } from "../../Configs/envConfig";
import { statusCodes } from "../../Configs/StatusCode";
import AppError from "../../ErrorHandlers/AppError";
import { UserModel } from "../user/user.model";
import { IChangePassword, ILoginUser, IRegisterUser } from "./auth.interface";
import { createToken, hashPassword, verifyPassword } from "./auth.utils";

const registerUserInDB = async (payload: IRegisterUser) => {
  const existingUser = await UserModel.findOne({ email: payload.email.toLowerCase() });
  if (existingUser) {
    throw new AppError(statusCodes.conflict, "An account with this email address already exists.");
  }

  // Create new user
  const user = await UserModel.create({
    ...payload,
    email: payload.email.toLowerCase(),
    role: payload.role || "user",
    status: "active",
  });

  // Generate JWT token
  const tokenPayload = {
    userId: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
  };

  const accessToken = createToken(tokenPayload, envConfig.jwtSecret, envConfig.jwtExpiresIn);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      department: user.department,
      phone: user.phone,
      studentId: user.studentId,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    },
    accessToken,
  };
};

const loginUserFromDB = async (payload: ILoginUser) => {
  const user = await UserModel.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(statusCodes.notFound, "No account found with this email address.");
  }

  if (user.status === "blocked") {
    throw new AppError(statusCodes.forbidden, "Your account has been blocked. Please contact an administrator.");
  }

  const isPasswordMatched = verifyPassword(payload.password, user.password as string);

  if (!isPasswordMatched) {
    throw new AppError(statusCodes.unAuthorized, "Incorrect password. Please try again.");
  }

  const tokenPayload = {
    userId: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
  };

  const accessToken = createToken(tokenPayload, envConfig.jwtSecret, envConfig.jwtExpiresIn);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      department: user.department,
      phone: user.phone,
      studentId: user.studentId,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    },
    accessToken,
  };
};

const changePasswordInDB = async (userId: string, payload: IChangePassword) => {
  const user = await UserModel.findById(userId).select("+password");

  if (!user) {
    throw new AppError(statusCodes.notFound, "User account not found.");
  }

  const isOldPasswordMatched = verifyPassword(payload.oldPassword, user.password as string);
  if (!isOldPasswordMatched) {
    throw new AppError(statusCodes.bad_req, "Current password does not match.");
  }

  // Update password directly using hash
  user.password = payload.newPassword;
  await user.save();

  return {
    message: "Password changed successfully.",
  };
};

const getCurrentUserProfileFromDB = async (userId: string) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError(statusCodes.notFound, "User account not found.");
  }

  return user;
};

export const AuthServices = {
  registerUserInDB,
  loginUserFromDB,
  changePasswordInDB,
  getCurrentUserProfileFromDB,
};
