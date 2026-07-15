import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../users/user.model.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/generateToken.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";
import { sendOTPEmail, sendPasswordResetEmail, sendWelcomeEmail } from "../../services/emailService.js";
import env from "../../config/env.js";

export const registerUser = async (data) => {
  const { firstName, lastName, email, password, phone } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    error.statusCode = 409;
    throw error;
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOTP = await bcrypt.hash(otp, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    emailVerificationOTP: hashedOTP,
    emailVerificationExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  });

  // Send emails (non-blocking)
  sendWelcomeEmail(email, firstName);
  sendOTPEmail(email, firstName, otp);

  return { userId: user._id, message: "Registration successful. Please verify your email." };
};

export const verifyEmail = async (email, otp) => {
  const user = await User.findOne({ email }).select("+emailVerificationOTP +emailVerificationExpiry");
  if (!user) {
    const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (!user.emailVerificationOTP || user.emailVerificationExpiry < Date.now()) {
    const error = new Error(ERROR_MESSAGES.INVALID_OTP);
    error.statusCode = 400;
    throw error;
  }

  const isMatch = await bcrypt.compare(otp, user.emailVerificationOTP);
  if (!isMatch) {
    const error = new Error(ERROR_MESSAGES.INVALID_OTP);
    error.statusCode = 400;
    throw error;
  }

  user.isEmailVerified = true;
  user.emailVerificationOTP = undefined;
  user.emailVerificationExpiry = undefined;
  await user.save();

  return { message: "Email verified successfully" };
};

export const resendOTP = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (user.isEmailVerified) {
    const error = new Error("Email is already verified");
    error.statusCode = 400;
    throw error;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOTP = await bcrypt.hash(otp, 10);

  user.emailVerificationOTP = hashedOTP;
  user.emailVerificationExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  sendOTPEmail(email, user.firstName, otp);

  return { message: "OTP resent to your email" };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password +refreshToken");
  if (!user) {
    const error = new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    error.statusCode = 401;
    throw error;
  }

  if (user.isBlocked) {
    const error = new Error(ERROR_MESSAGES.ACCOUNT_BLOCKED);
    error.statusCode = 403;
    throw error;
  }

  if (!user.isEmailVerified) {
    const error = new Error(ERROR_MESSAGES.EMAIL_NOT_VERIFIED);
    error.statusCode = 403;
    throw error;
  }

  // Check lockout
  if (user.isLocked()) {
    const error = new Error(ERROR_MESSAGES.ACCOUNT_LOCKED);
    error.statusCode = 423;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    user.failedLoginAttempts += 1;
    if (user.failedLoginAttempts >= 5) {
      user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 min lock
    }
    await user.save();
    const error = new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    error.statusCode = 401;
    throw error;
  }

  // Reset failed attempts
  user.failedLoginAttempts = 0;
  user.lockUntil = undefined;

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = await bcrypt.hash(refreshToken, 10);
  await user.save();

  const userData = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };

  return { accessToken, refreshToken, user: userData };
};

export const refreshAccessToken = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    const error = new Error(ERROR_MESSAGES.REFRESH_TOKEN_MISSING);
    error.statusCode = 401;
    throw error;
  }

  const decoded = verifyRefreshToken(incomingRefreshToken);
  const user = await User.findById(decoded.id).select("+refreshToken");

  if (!user || !user.refreshToken) {
    const error = new Error(ERROR_MESSAGES.REFRESH_TOKEN_INVALID);
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(incomingRefreshToken, user.refreshToken);
  if (!isMatch) {
    const error = new Error(ERROR_MESSAGES.REFRESH_TOKEN_INVALID);
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user._id, user.role);
  const newRefreshToken = generateRefreshToken(user._id);

  user.refreshToken = await bcrypt.hash(newRefreshToken, 10);
  await user.save();

  return { accessToken, refreshToken: newRefreshToken };
};

export const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: "" });
  return { message: "Logged out successfully" };
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = await bcrypt.hash(resetToken, 10);
  user.resetPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min
  await user.save();

  const resetUrl = `${env.FRONTEND_URL}/reset-password/${resetToken}`;
  sendPasswordResetEmail(email, user.firstName, resetUrl);

  return { message: "Password reset email sent" };
};

export const resetPassword = async (token, newPassword) => {
  // Find users with non-expired reset tokens
  const users = await User.find({
    resetPasswordExpiry: { $gt: Date.now() },
  }).select("+resetPasswordToken +resetPasswordExpiry");

  let targetUser = null;
  for (const user of users) {
    const isMatch = await bcrypt.compare(token, user.resetPasswordToken);
    if (isMatch) {
      targetUser = user;
      break;
    }
  }

  if (!targetUser) {
    const error = new Error(ERROR_MESSAGES.INVALID_RESET_TOKEN);
    error.statusCode = 400;
    throw error;
  }

  targetUser.password = newPassword;
  targetUser.resetPasswordToken = undefined;
  targetUser.resetPasswordExpiry = undefined;
  await targetUser.save();

  return { message: "Password reset successful" };
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!user) {
    const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    const error = new Error(ERROR_MESSAGES.PASSWORD_MISMATCH);
    error.statusCode = 400;
    throw error;
  }

  user.password = newPassword;
  await user.save();

  return { message: "Password changed successfully" };
};
