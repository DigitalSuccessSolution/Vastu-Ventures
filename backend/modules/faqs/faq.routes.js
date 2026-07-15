import express from "express";
import * as faqController from "./faq.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/authorizeRoles.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { createFaqSchema, updateFaqSchema } from "./faq.validator.js";

const router = express.Router();
const adminRouter = express.Router();

// Public routes
router.get("/", faqController.getFaqsPublic);

// Admin routes (secured under /api/v1/admin prefix)
adminRouter.use(isAuthenticated, authorizeRoles("admin"));
adminRouter.get("/", faqController.getAllFaqsAdmin);
adminRouter.post("/", validateRequest(createFaqSchema), faqController.createFaq);
adminRouter.put("/:id", validateRequest(updateFaqSchema), faqController.updateFaq);
adminRouter.delete("/:id", faqController.deleteFaq);

export { router as publicFaqRoutes, adminRouter as adminFaqRoutes };
