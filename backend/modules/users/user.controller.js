import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as userService from "./user.service.js";

export const getProfile = asyncHandler(async (req, res) => {
  const userDoc = await userService.getProfile(req.user._id);
  const profile = userDoc.toObject();
  profile.name = `${profile.firstName} ${profile.lastName}`;
  return sendResponse(res, 200, "Profile retrieved successfully", profile);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };
  if (updateData.name) {
    const parts = updateData.name.trim().split(" ");
    updateData.firstName = parts[0];
    updateData.lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";
    delete updateData.name;
  }
  const userDoc = await userService.updateProfile(req.user._id, updateData);
  const profile = userDoc.toObject();
  profile.name = `${profile.firstName} ${profile.lastName}`.trim();
  return sendResponse(res, 200, "Profile updated successfully", profile);
});

export const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Please upload an avatar image file" });
  }
  const profile = await userService.updateAvatar(req.user._id, req.file.buffer);
  return sendResponse(res, 200, "Avatar updated successfully", profile.avatar);
});

export const getPurchasedCourses = asyncHandler(async (req, res) => {
  const courses = await userService.getPurchasedCourses(req.user._id);
  return sendResponse(res, 200, "Purchased courses retrieved", courses);
});

export const getCertificates = asyncHandler(async (req, res) => {
  const certificates = await userService.getCertificates(req.user._id);
  return sendResponse(res, 200, "Certificates retrieved", certificates);
});

export const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await userService.getAppointments(req.user._id);
  return sendResponse(res, 200, "Appointments retrieved", appointments);
});

export const getPayments = asyncHandler(async (req, res) => {
  const payments = await userService.getPayments(req.user._id);
  return sendResponse(res, 200, "Payment history retrieved", payments);
});

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await userService.getWishlist(req.user._id);
  return sendResponse(res, 200, "Wishlist retrieved", wishlist);
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const wishlist = await userService.addToWishlist(req.user._id, courseId);
  return sendResponse(res, 200, "Course added to wishlist", wishlist);
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const wishlist = await userService.removeFromWishlist(req.user._id, courseId);
  return sendResponse(res, 200, "Course removed from wishlist", wishlist);
});

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await userService.getNotifications(req.user._id);
  return sendResponse(res, 200, "Notifications retrieved", notifications);
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notification = await userService.markNotificationRead(req.user._id, id);
  return sendResponse(res, 200, "Notification marked as read", notification);
});

export const markAllNotificationsRead = asyncHandler(async (req, res) => {
  const result = await userService.markAllNotificationsRead(req.user._id);
  return sendResponse(res, 200, result.message);
});
