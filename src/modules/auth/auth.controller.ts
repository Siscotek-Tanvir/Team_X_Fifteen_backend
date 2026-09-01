import { Request, Response } from "express";
import { statusCodes } from "../../Configs/StatusCode";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/response";
import { AuthServices } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUserInDB(req.body);

  sendResponse(res, {
    statusCode: statusCodes.create,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUserFromDB(req.body);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any)._id;
  const result = await AuthServices.changePasswordInDB(userId, req.body);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "Password updated successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any)._id;
  const result = await AuthServices.getCurrentUserProfileFromDB(userId);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "User profile fetched successfully",
    data: result,
  });
});

export const AuthControllers = {
  register,
  login,
  changePassword,
  getMe,
};
