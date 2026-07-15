import Notification from "./notification.model.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";

export const getNotifications = async (userId) => {
  return Notification.find({ user: userId }).sort({ createdAt: -1 });
};

export const markRead = async (userId, id) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: id, user: userId },
    { $set: { isRead: true } },
    { new: true }
  );
  if (!notification) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return notification;
};

export const markAllRead = async (userId) => {
  await Notification.updateMany({ user: userId, isRead: false }, { $set: { isRead: true } });
  return { message: "All notifications marked as read" };
};
