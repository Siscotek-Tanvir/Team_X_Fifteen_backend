import { z } from "zod";

export const registerValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: "Name is required" }).min(2, "Name must be at least 2 characters"),
    email: z.string({ message: "Email is required" }).email("Invalid email format"),
    password: z.string({ message: "Password is required" }).min(6, "Password must be at least 6 characters"),
    role: z.enum(["admin", "user"] as const).optional().default("user"),
    phone: z.string().optional(),
    department: z.string().optional(),
    studentId: z.string().optional(),
    avatarUrl: z.string().optional(),
    bio: z.string().optional(),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ message: "Email is required" }).email("Invalid email format"),
    password: z.string({ message: "Password is required" }).min(1, "Password cannot be empty"),
  }),
});

export const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ message: "Old password is required" }),
    newPassword: z.string({ message: "New password is required" }).min(6, "New password must be at least 6 characters"),
  }),
});

export const AuthValidations = {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
};
