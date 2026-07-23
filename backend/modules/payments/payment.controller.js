import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as paymentService from "./payment.service.js";

export const createOrder = asyncHandler(async (req, res) => {
  const orderDetails = await paymentService.createOrder(req.user._id, req.body);
  return sendResponse(res, 201, "Payment order created successfully", orderDetails);
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const result = await paymentService.verifyPayment(req.user._id, req.body);
  return sendResponse(res, 200, "Payment verified successfully", result);
});

export const verifyMockCoursePayment = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const result = await paymentService.verifyMockCoursePayment(req.user._id, courseId);
  return sendResponse(res, 200, "Mock course payment verified successfully", result);
});

export const handleWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  const result = await paymentService.handleWebhook(req.rawBody, signature);
  return res.status(200).json(result);
});

export const getMyPayments = asyncHandler(async (req, res) => {
  const payments = await paymentService.getMyPayments(req.user._id);
  return sendResponse(res, 200, "Payments retrieved", payments);
});

export const getPaymentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const details = await paymentService.getPaymentDetail(req.user._id, id);
  return sendResponse(res, 200, "Payment details retrieved", details);
});

export const downloadInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pdfUrl = await paymentService.downloadInvoice(req.user._id, id);
  return sendResponse(res, 200, "Invoice URL generated", { downloadUrl: pdfUrl });
});

export const getAllPaymentsAdmin = asyncHandler(async (req, res) => {
  const payments = await paymentService.getAllPaymentsAdmin();
  return sendResponse(res, 200, "All payments retrieved for admin", payments);
});

export const refundPayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { refundReason } = req.body;
  const refunded = await paymentService.refundPayment(id, refundReason);
  return sendResponse(res, 200, "Refund processed successfully", refunded);
});

