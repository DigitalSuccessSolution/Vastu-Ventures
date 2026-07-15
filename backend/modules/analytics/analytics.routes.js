import express from "express";
import * as analyticsController from "./analytics.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/authorizeRoles.js";

const router = express.Router();

router.use(isAuthenticated, authorizeRoles("admin"));

router.get("/dashboard", analyticsController.getDashboardStats);
router.get("/recent-payments", analyticsController.getRecentPayments);
router.get("/recent-users", analyticsController.getRecentUsers);
router.get("/popular-courses", analyticsController.getPopularCourses);
router.get("/consultation-stats", analyticsController.getConsultationStats);
router.get("/revenue-trend", analyticsController.getRevenueTrend);

export default router;
