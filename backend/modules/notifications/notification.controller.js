import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as notificationService from "./notification.service.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await notificationService.getNotifications(req.user._id);
  return sendResponse(res, 200, "Notifications list retrieved", notifications);
});

export const markRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notification = await notificationService.markRead(req.user._id, id);
  return sendResponse(res, 200, "Notification marked as read", notification);
});

export const markAllRead = asyncHandler(async (req, res) => {
  const result = await notificationService.markAllRead(req.user._id);
  return sendResponse(res, 200, result.message);
});
