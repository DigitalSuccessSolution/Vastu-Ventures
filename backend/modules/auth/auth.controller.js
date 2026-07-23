import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as authService from "./auth.service.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  path: "/",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  return sendResponse(res, 201, result.message, { userId: result.userId });
});
export const guestLogin = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, user } = await authService.guestLoginUser(req.body);

  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

  return sendResponse(res, 200, "Guest login successful", { accessToken, user });
});


export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken, user } = await authService.loginUser(email, password);

  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

  return sendResponse(res, 200, "Login successful", { accessToken, user });
});

export const refresh = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;
  const { accessToken, refreshToken } = await authService.refreshAccessToken(incomingRefreshToken);

  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

  return sendResponse(res, 200, "Access token refreshed", { accessToken });
});

export const logout = asyncHandler(async (req, res) => {
  if (req.user) {
    await authService.logoutUser(req.user._id);
  }
  res.clearCookie("refreshToken", { path: "/" });
  return sendResponse(res, 200, "Logout successful");
});

export const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await authService.forgotPassword(email);
  return sendResponse(res, 200, result.message);
});

export const resetPasswordConfirm = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const result = await authService.resetPassword(token, password);
  return sendResponse(res, 200, result.message);
});

export const changePasswordRequest = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const result = await authService.changePassword(req.user._id, currentPassword, newPassword);
  return sendResponse(res, 200, result.message);
});
