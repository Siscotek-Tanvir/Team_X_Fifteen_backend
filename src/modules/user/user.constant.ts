export const userSearchableFields = ["name", "email", "phone", "department", "studentId"];

export const USER_ROLE = {
  admin: "admin",
  user: "user",
  moderator: "moderator",
} as const;

export const USER_STATUS = {
  active: "active",
  blocked: "blocked",
  inactive: "inactive",
} as const;
