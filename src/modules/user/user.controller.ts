import { Request, Response } from "express";
import { statusCodes } from "../../Configs/StatusCode";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/response";
import { UserServices } from "./user.service";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createAdminInDB(req.body);

  sendResponse(res, {
    statusCode: statusCodes.create,
    success: true,
    message: "New Administrator account created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "Users fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserByIdFromDB(id);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "User details retrieved successfully",
    data: result,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await UserServices.updateUserRoleInDB(id, role);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: `User role updated to '${role}' successfully`,
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await UserServices.updateUserStatusInDB(id, status);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: `User status updated to '${status}' successfully`,
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.updateUserInDB(id, req.body);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const currentAdminId = (req.user as any)?._id?.toString();
  const result = await UserServices.deleteUserFromDB(id, currentAdminId);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

const getUserStats = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserStatsFromDB();

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "User statistics retrieved successfully",
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  updateUserStatus,
  updateUser,
  deleteUser,
  getUserStats,
};
