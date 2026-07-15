import express from "express";
import * as notificationController from "./notification.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/", notificationController.getNotifications);
router.patch("/:id/read", notificationController.markRead);
router.patch("/read-all", notificationController.markAllRead);

export default router;
