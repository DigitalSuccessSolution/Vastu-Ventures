import express from "express";
import * as authController from "./auth.controller.js";
import { authLimiter } from "../../middlewares/rateLimiter.js";
import validateRequest from "../../middlewares/validateRequest.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resendOTPSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "./auth.validator.js";

const router = express.Router();

router.post("/register", authLimiter, validateRequest(registerSchema), authController.register);
router.post("/verify-email", authLimiter, validateRequest(verifyEmailSchema), authController.verify);
router.post("/resend-otp", authLimiter, validateRequest(resendOTPSchema), authController.resendOtpCode);
router.post("/login", authLimiter, validateRequest(loginSchema), authController.login);
router.post("/refresh-token", authController.refresh);
router.post("/logout", isAuthenticated, authController.logout);
router.post("/forgot-password", authLimiter, validateRequest(forgotPasswordSchema), authController.forgotPasswordRequest);
router.post("/reset-password/:token", authLimiter, validateRequest(resetPasswordSchema), authController.resetPasswordConfirm);
router.put("/change-password", isAuthenticated, validateRequest(changePasswordSchema), authController.changePasswordRequest);

export default router;
