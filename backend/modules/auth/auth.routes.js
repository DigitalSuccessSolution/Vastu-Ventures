import express from "express";
import * as authController from "./auth.controller.js";
import validateRequest from "../../middlewares/validateRequest.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "./auth.validator.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), authController.register);
router.post("/login", validateRequest(loginSchema), authController.login);
router.post("/guest-login", authController.guestLogin);
router.post("/refresh-token", authController.refresh);
router.post("/logout", isAuthenticated, authController.logout);
router.post("/forgot-password", validateRequest(forgotPasswordSchema), authController.forgotPasswordRequest);
router.post("/reset-password/:token", validateRequest(resetPasswordSchema), authController.resetPasswordConfirm);
router.put("/change-password", isAuthenticated, validateRequest(changePasswordSchema), authController.changePasswordRequest);

export default router;
