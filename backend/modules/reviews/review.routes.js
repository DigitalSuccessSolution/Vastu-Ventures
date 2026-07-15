import express from "express";
import * as reviewController from "./review.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/authorizeRoles.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { createReviewSchema } from "./review.validator.js";

const router = express.Router();
const adminRouter = express.Router();

// Authenticated Student reviews routes
router.post("/", isAuthenticated, validateRequest(createReviewSchema), reviewController.submitReview);
router.get("/my", isAuthenticated, reviewController.getMyReviews);

// Admin routes (secured under /api/v1/admin prefix)
adminRouter.use(isAuthenticated, authorizeRoles("admin"));
adminRouter.get("/", reviewController.getAllReviewsAdmin);
adminRouter.patch("/:id/approve", reviewController.approveReview);
adminRouter.patch("/:id/reject", reviewController.rejectReview);
adminRouter.delete("/:id", reviewController.deleteReview);

export { router as publicReviewRoutes, adminRouter as adminReviewRoutes };
