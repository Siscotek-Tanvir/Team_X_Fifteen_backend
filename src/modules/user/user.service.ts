import { envConfig } from "../../Configs/envConfig";
import { statusCodes } from "../../Configs/StatusCode";
import AppError from "../../ErrorHandlers/AppError";
import { userSearchableFields } from "./user.constant";
import { IUser, IUserQuery, IUserRole, IUserStatus } from "./user.interface";
import { UserModel } from "./user.model";

/**
 * Auto-creates default admin user if no admin exists in the database
 */
const seedDefaultAdminUserIfEmpty = async () => {
  try {
    const adminExists = await UserModel.findOne({ role: "admin" });
    if (!adminExists) {
      console.log("No admin user found. Creating default admin account...");
      await UserModel.create({
        name: "System Administrator",
        email: envConfig.adminEmail.toLowerCase(),
        password: envConfig.adminPassword,
        role: "admin",
        status: "active",
        department: "Administration",
        bio: "Primary super administrator for Team X Fifteen Portal",
      });
      console.log(`Default admin created: ${envConfig.adminEmail} / ${envConfig.adminPassword}`);
    }
  } catch (error) {
    console.error("Error creating default admin user:", error);
  }
};

/**
 * Get all users with search, role/status filtering, and pagination (Admin only)
 */
const getAllUsersFromDB = async (query: IUserQuery) => {
  const {
    searchTerm,
    search,
    role,
    status,
    department,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const filterConditions: Record<string, any> = {};

  const effectiveSearch = searchTerm || search;
  if (effectiveSearch) {
    filterConditions.$or = userSearchableFields.map((field) => ({
      [field]: { $regex: effectiveSearch, $options: "i" },
    }));
  }

  if (role && role !== "all") {
    filterConditions.role = role;
  }

  if (status && status !== "all") {
    filterConditions.status = status;
  }

  if (department && department !== "all") {
    filterConditions.department = { $regex: department, $options: "i" };
  }

  const parsedPage = Math.max(1, Number(page) || 1);
  const parsedLimit = Number(limit) === 0 || Number(limit) === -1 ? 0 : Math.max(1, Number(limit) || 10);
  const skip = parsedLimit > 0 ? (parsedPage - 1) * parsedLimit : 0;

  const sortDirection: 1 | -1 = sortOrder === "asc" || sortOrder === 1 ? 1 : -1;
  const sortOptions: Record<string, 1 | -1> = {
    [sortBy]: sortDirection,
  };

  const total = await UserModel.countDocuments(filterConditions);

  let queryBuilder = UserModel.find(filterConditions).sort(sortOptions);

  if (parsedLimit > 0) {
    queryBuilder = queryBuilder.skip(skip).limit(parsedLimit);
  }

  const users = await queryBuilder.exec();
  const totalPage = parsedLimit > 0 ? Math.ceil(total / parsedLimit) : 1;

  return {
    meta: {
      page: parsedPage,
      limit: parsedLimit > 0 ? parsedLimit : total,
      total,
      totalPage,
    },
    data: users,
  };
};

/**
 * Get single user by ID
 */
const getSingleUserByIdFromDB = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new AppError(statusCodes.notFound, `User with ID '${id}' not found.`);
  }

  return user;
};

/**
 * Update user role (Admin only)
 */
const updateUserRoleInDB = async (id: string, role: IUserRole) => {
  const user = await UserModel.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError(statusCodes.notFound, `User with ID '${id}' not found.`);
  }

  return user;
};

/**
 * Update user status (Admin only)
 */
const updateUserStatusInDB = async (id: string, status: IUserStatus) => {
  const user = await UserModel.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError(statusCodes.notFound, `User with ID '${id}' not found.`);
  }

  return user;
};

/**
 * Update user profile details
 */
const updateUserInDB = async (id: string, payload: Partial<IUser>) => {
  // Prevent direct password alteration through this endpoint
  delete payload.password;

  const user = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new AppError(statusCodes.notFound, `User with ID '${id}' not found.`);
  }

  return user;
};

/**
 * Delete user account (Admin only)
 */
const deleteUserFromDB = async (id: string, currentAdminId?: string) => {
  if (currentAdminId && currentAdminId === id) {
    throw new AppError(statusCodes.bad_req, "You cannot delete your own admin account.");
  }

  const user = await UserModel.findByIdAndDelete(id);

  if (!user) {
    throw new AppError(statusCodes.notFound, `User with ID '${id}' not found.`);
  }

  return user;
};

/**
 * Get user stats (Admin only)
 */
const getUserStatsFromDB = async () => {
  const totalUsers = await UserModel.countDocuments();
  const totalAdmins = await UserModel.countDocuments({ role: "admin" });
  const totalRegularUsers = await UserModel.countDocuments({ role: "user" });
  const totalModerators = await UserModel.countDocuments({ role: "moderator" });
  const activeUsers = await UserModel.countDocuments({ status: "active" });
  const blockedUsers = await UserModel.countDocuments({ status: "blocked" });

  return {
    totalUsers,
    totalAdmins,
    totalRegularUsers,
    totalModerators,
    activeUsers,
    blockedUsers,
  };
};

export const UserServices = {
  seedDefaultAdminUserIfEmpty,
  getAllUsersFromDB,
  getSingleUserByIdFromDB,
  updateUserRoleInDB,
  updateUserStatusInDB,
  updateUserInDB,
  deleteUserFromDB,
  getUserStatsFromDB,
};
