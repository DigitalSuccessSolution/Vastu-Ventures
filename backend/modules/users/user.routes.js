import express from "express";
import * as userController from "./user.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import { uploadImage } from "../../middlewares/uploadMiddleware.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { updateUserProfileSchema } from "./user.validator.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/profile", userController.getProfile);
router.put("/profile", validateRequest(updateUserProfileSchema), userController.updateProfile);
router.put("/avatar", uploadImage.single("avatar"), userController.updateAvatar);

router.get("/purchased-courses", userController.getPurchasedCourses);
router.get("/certificates", userController.getCertificates);
router.get("/appointments", userController.getAppointments);
router.get("/payments", userController.getPayments);

router.get("/wishlist", userController.getWishlist);
router.post("/wishlist/:courseId", userController.addToWishlist);
router.delete("/wishlist/:courseId", userController.removeFromWishlist);

router.get("/notifications", userController.getNotifications);
router.patch("/notifications/:id/read", userController.markNotificationRead);
router.patch("/notifications/read-all", userController.markAllNotificationsRead);

export default router;
