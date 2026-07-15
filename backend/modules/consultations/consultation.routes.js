import express from "express";
import * as consultationController from "./consultation.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/authorizeRoles.js";
import validateRequest from "../../middlewares/validateRequest.js";
import {
  bookConsultationSchema,
  submitInquirySchema,
  updateConsultationStatusSchema,
} from "./consultation.validator.js";

const router = express.Router();
const adminRouter = express.Router();

// Public routes
router.get("/availability", consultationController.checkAvailability);
router.post("/inquiry", validateRequest(submitInquirySchema), consultationController.submitInquiry);

// Authenticated Student routes
router.post("/book", isAuthenticated, validateRequest(bookConsultationSchema), consultationController.bookConsultation);
router.get("/my", isAuthenticated, consultationController.getMyConsultations);
router.get("/my/:id", isAuthenticated, consultationController.getMyConsultationById);

// Admin routes (secured under /api/v1/admin prefix)
adminRouter.use(isAuthenticated, authorizeRoles("admin"));
adminRouter.get("/", consultationController.getAllConsultationsAdmin);
adminRouter.get("/:id", consultationController.getConsultationByIdAdmin);
adminRouter.patch("/:id/status", validateRequest(updateConsultationStatusSchema), consultationController.updateConsultationStatus);

export { router as publicConsultationRoutes, adminRouter as adminConsultationRoutes };
