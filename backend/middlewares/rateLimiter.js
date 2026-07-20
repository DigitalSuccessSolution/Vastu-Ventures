import rateLimit from "express-rate-limit";
import env from "../config/env.js";

/**
 * General API rate limiter.
 */
export const generalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: env.NODE_ENV === "development" ? 10000 : (env.RATE_LIMIT_MAX || 100),
  message: { success: false, message: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => env.NODE_ENV === "development",
});

/**
 * Strict rate limiter for auth routes (login, forgot-password, OTP).
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.NODE_ENV === "development" ? 10000 : (env.AUTH_RATE_LIMIT_MAX || 5),
  message: { success: false, message: "Too many authentication attempts. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => env.NODE_ENV === "development",
});
