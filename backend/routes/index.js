import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import notificationRoutes from "../modules/notifications/notification.routes.js";
import { publicServiceRoutes } from "../modules/services/service.routes.js";
import { publicConsultationRoutes } from "../modules/consultations/consultation.routes.js";
import { publicCourseRoutes, publicCourseCategoryRoutes } from "../modules/courses/course.routes.js";
import learnRoutes from "../modules/enrollments/enrollment.routes.js";
import certificateRoutes from "../modules/certificates/certificate.routes.js";
import { publicPaymentRoutes } from "../modules/payments/payment.routes.js";
import { publicReviewRoutes } from "../modules/reviews/review.routes.js";
import { publicBlogRoutes, publicBlogCategoryRoutes } from "../modules/blogs/blog.routes.js";
import { publicFaqRoutes } from "../modules/faqs/faq.routes.js";
import adminRoutes from "../modules/admin/admin.routes.js";

const router = express.Router();

// Public / Student endpoints
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/notifications", notificationRoutes);
router.use("/services", publicServiceRoutes);
router.use("/consultations", publicConsultationRoutes);
router.use("/courses", publicCourseRoutes);
router.use("/course-categories", publicCourseCategoryRoutes);
router.use("/learn", learnRoutes);
router.use("/certificates", certificateRoutes);
router.use("/payments", publicPaymentRoutes);
router.use("/reviews", publicReviewRoutes);
router.use("/blogs", publicBlogRoutes);
router.use("/blog-categories", publicBlogCategoryRoutes);
router.use("/faqs", publicFaqRoutes);

// Admin aggregated endpoints
router.use("/admin", adminRoutes);

export default router;
