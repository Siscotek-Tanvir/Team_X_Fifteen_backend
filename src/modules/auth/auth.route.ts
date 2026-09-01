import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { AuthValidations } from "./auth.validation";

const router = Router();

// Public authentication endpoints
router.post(
  "/register",
  validateRequest(AuthValidations.registerValidationSchema),
  AuthControllers.register
);
router.post(
  "/signup",
  validateRequest(AuthValidations.registerValidationSchema),
  AuthControllers.register
);

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.login
);
router.post(
  "/signin",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.login
);

// Protected authenticated user endpoints
router.post(
  "/change-password",
  auth(),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword
);

router.get("/me", auth(), AuthControllers.getMe);
router.get("/profile", auth(), AuthControllers.getMe);

export const AuthRoutes = router;
