import express from "express";
import * as paymentController from "./payment.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/authorizeRoles.js";
import validateRequest from "../../middlewares/validateRequest.js";
import {
  createOrderSchema,
  verifyPaymentSchema,
  refundPaymentSchema,
} from "./payment.validator.js";

const router = express.Router();
const adminRouter = express.Router();

// Razorpay Webhook (Signature-verified inside handler, public route with raw body)
router.post("/webhook", paymentController.handleWebhook);

// Authenticated Student payment routes
router.post("/create-order", isAuthenticated, validateRequest(createOrderSchema), paymentController.createOrder);
router.post("/verify", isAuthenticated, validateRequest(verifyPaymentSchema), paymentController.verifyPayment);
router.get("/my", isAuthenticated, paymentController.getMyPayments);
router.get("/my/:id", isAuthenticated, paymentController.getPaymentDetail);
router.get("/my/:id/invoice", isAuthenticated, paymentController.downloadInvoice);

// Admin routes (secured under /api/v1/admin prefix)
adminRouter.use(isAuthenticated, authorizeRoles("admin"));
adminRouter.get("/", paymentController.getAllPaymentsAdmin);
adminRouter.patch("/:id/refund", validateRequest(refundPaymentSchema), paymentController.refundPayment);

export { router as publicPaymentRoutes, adminRouter as adminPaymentRoutes };
