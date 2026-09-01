import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { UserValidations } from "./user.validation";

const router = Router();

// Protect ALL user management routes with Admin-Only authorization
router.use(auth("admin"));

// Statistics
router.get("/stats", UserControllers.getUserStats);

// Collection routes
router.get("/", UserControllers.getAllUsers);

// Individual user routes
router.get("/:id", UserControllers.getSingleUser);

router.patch(
  "/:id/role",
  validateRequest(UserValidations.updateUserRoleValidationSchema),
  UserControllers.updateUserRole
);

router.patch(
  "/:id/status",
  validateRequest(UserValidations.updateUserStatusValidationSchema),
  UserControllers.updateUserStatus
);

router.patch(
  "/:id",
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser
);

router.delete("/:id", UserControllers.deleteUser);

export const UserRoutes = router;
