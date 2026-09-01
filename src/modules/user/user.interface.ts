import { Model } from "mongoose";

export type IUserRole = "admin" | "user" | "moderator";
export type IUserStatus = "active" | "blocked" | "inactive";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: IUserRole;
  status: IUserStatus;
  phone?: string;
  department?: string;
  studentId?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserQuery {
  searchTerm?: string;
  search?: string;
  role?: string;
  status?: string;
  department?: string;
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: "asc" | "desc" | 1 | -1;
}

export interface IUserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser | null>;
}
