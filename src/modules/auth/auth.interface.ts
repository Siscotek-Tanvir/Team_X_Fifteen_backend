import { IUserRole, IUserStatus } from "../user/user.interface";

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  role?: IUserRole;
  phone?: string;
  department?: string;
  studentId?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IJwtPayload {
  userId: string;
  email: string;
  role: IUserRole;
  name: string;
  status: IUserStatus;
  iat?: number;
  exp?: number;
}
