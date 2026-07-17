import express from "express";
import * as adminController from "./admin.controller.js";
import { adminServiceRoutes } from "../services/service.routes.js";
import { adminCourseRoutes, adminCourseCategoryRoutes } from "../courses/course.routes.js";
import { adminConsultationRoutes } from "../consultations/consultation.routes.js";
import { adminPaymentRoutes } from "../payments/payment.routes.js";
import { adminReviewRoutes } from "../reviews/review.routes.js";
import { adminBlogRoutes, adminBlogCategoryRoutes } from "../blogs/blog.routes.js";
import { adminFaqRoutes } from "../faqs/faq.routes.js";
import analyticsRoutes from "../analytics/analytics.routes.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/authorizeRoles.js";

const router = express.Router();

// Apply global admin guards
router.use(isAuthenticated, authorizeRoles("admin", "instructor"));

// 1. Dashboard & Reports
router.use("/analytics", analyticsRoutes);

// 2. Service Management
router.use("/services", adminServiceRoutes);

// 3. Course Management
router.use("/courses", adminCourseRoutes);
router.use("/course-categories", adminCourseCategoryRoutes);

// 5. Appointment Management
router.use("/consultations", adminConsultationRoutes);

// 6. Payment Management
router.use("/payments", adminPaymentRoutes);

// 7. Review Management
router.use("/reviews", adminReviewRoutes);

// 8. Blog Management
router.use("/blogs", adminBlogRoutes);
router.use("/blog-categories", adminBlogCategoryRoutes);

// 9. FAQ Management
router.use("/faqs", adminFaqRoutes);


// 11. Student Management
router.get("/students", adminController.getAllStudents);
router.get("/students/:id", adminController.getStudentDetail);
router.patch("/students/:id/block", adminController.toggleBlockStatus);

export default router;
