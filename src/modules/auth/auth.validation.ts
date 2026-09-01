import { z } from "zod";

export const registerValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(2, "Name must be at least 2 characters"),
    email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
    password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters"),
    role: z.enum(["admin", "user", "moderator"]).optional().default("user"),
    phone: z.string().optional(),
    department: z.string().optional(),
    studentId: z.string().optional(),
    avatarUrl: z.string().url().optional().or(z.literal("")),
    bio: z.string().optional(),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
    password: z.string({ required_error: "Password is required" }).min(1, "Password cannot be empty"),
  }),
});

export const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z.string({ required_error: "New password is required" }).min(6, "New password must be at least 6 characters"),
  }),
});

export const AuthValidations = {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
};
