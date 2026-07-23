
import User from "./user.model.js";
import Enrollment from "../enrollments/enrollment.model.js";
import CourseProgress from "../enrollments/courseProgress.model.js";
import Certificate from "../certificates/certificate.model.js";
import Consultation from "../consultations/consultation.model.js";
import Payment from "../payments/payment.model.js";
import Notification from "../notifications/notification.model.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../../services/cloudinaryService.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";

export const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return user;
};

export const updateProfile = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
  if (!user) {
    const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return user;
};

export const updateAvatar = async (userId, fileBuffer) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  // Delete old avatar if exists
  if (user.avatar && user.avatar.publicId) {
    await deleteFromCloudinary(user.avatar.publicId);
  }

  // Upload new avatar
  const uploadResult = await uploadToCloudinary(fileBuffer, "vastuventures/avatars");
  user.avatar = {
    url: uploadResult.url,
    publicId: uploadResult.publicId,
  };
  await user.save();

  return user;
};

export const getPurchasedCourses = async (userId) => {
  // Sync/heal any paid course payments that might be missing enrollment records
  const paidPayments = await Payment.find({
    user: userId,
    orderType: "course",
    status: "paid"
  });

  for (const pay of paidPayments) {
    if (pay.course) {
      const existing = await Enrollment.findOne({ user: userId, course: pay.course });
      if (!existing) {
        await Enrollment.create({
          user: userId,
          course: pay.course,
          payment: pay._id,
          enrolledAt: pay.paidAt || pay.createdAt || new Date()
        });
      }
    }
  }

  const enrollments = await Enrollment.find({ user: userId })
    .populate({
      path: "course",
      populate: { path: "category" }
    })
    .populate("payment")
    .sort({ createdAt: -1 });

  const result = [];
  for (const e of enrollments) {
    if (!e.course) continue;

    const courseObj = e.course.toObject ? e.course.toObject() : e.course;
    const totalModules = (courseObj.curriculum || []).reduce(
      (acc, sec) => acc + (sec.lessons || []).length,
      0
    );

    const completedModules = await CourseProgress.countDocuments({
      user: userId,
      course: courseObj._id,
      isCompleted: true
    });

    const isCompleted = e.isCompleted || (e.completionPercentage || 0) >= 100;
    const progressPercentage = isCompleted ? 100 : (e.completionPercentage || (totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0));
    const finalCompletedModules = isCompleted ? totalModules : completedModules;

    const obj = e.toObject();
    obj.progressPercentage = progressPercentage;
    obj.totalModules = totalModules;
    obj.completedModules = finalCompletedModules;
    obj.isCompleted = isCompleted;
    result.push(obj);
  }

  return result;
};

export const getCertificates = async (userId) => {
  const certificates = await Certificate.find({ user: userId }).populate("course");
  return certificates;
};

export const getAppointments = async (userId) => {
  const consultations = await Consultation.find({ user: userId }).populate("service");
  return consultations;
};

export const getPayments = async (userId) => {
  const payments = await Payment.find({ user: userId }).populate("course").populate("consultation").populate("architecturePlan");
  return payments;
};

export const getWishlist = async (userId) => {
  const user = await User.findById(userId).populate("wishlist");
  if (!user) {
    const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return user.wishlist;
};

export const addToWishlist = async (userId, courseId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (user.wishlist.includes(courseId)) {
    return user.wishlist;
  }

  user.wishlist.push(courseId);
  await user.save();
  return user.wishlist;
};

export const removeFromWishlist = async (userId, courseId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  user.wishlist = user.wishlist.filter((id) => id.toString() !== courseId);
  await user.save();
  return user.wishlist;
};

export const getNotifications = async (userId) => {
  const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
  return notifications;
};

export const markNotificationRead = async (userId, notificationId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { $set: { isRead: true } },
    { returnDocument: "after" }
  );
  if (!notification) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return notification;
};

export const markAllNotificationsRead = async (userId) => {
  await Notification.updateMany({ user: userId, isRead: false }, { $set: { isRead: true } });
  return { message: "All notifications marked as read" };
};
