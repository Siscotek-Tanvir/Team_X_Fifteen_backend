import { z } from "zod";

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    phone: z.string().optional(),
    department: z.string().optional(),
    studentId: z.string().optional(),
    avatarUrl: z.string().optional(),
    bio: z.string().optional(),
  }),
});

export const updateUserRoleValidationSchema = z.object({
  body: z.object({
    role: z.enum(["admin", "user", "moderator"] as const, {
      message: "Role is required and must be either admin, user, or moderator",
    }),
  }),
});

export const updateUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(["active", "blocked", "inactive"] as const, {
      message: "Status is required and must be either active, blocked, or inactive",
    }),
  }),
});

export const UserValidations = {
  updateUserValidationSchema,
  updateUserRoleValidationSchema,
  updateUserStatusValidationSchema,
};
