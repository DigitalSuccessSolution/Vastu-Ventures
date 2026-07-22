import { z } from "zod";

export const createOrderSchema = z.object({
  orderType: z.enum(["course", "consultation", "architecture-plan"]),
  courseId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  consultationId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  architecturePlanId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
});

export const verifyPaymentSchema = z.object({
  razorpayOrderId: z.string().min(1, "Razorpay Order ID is required"),
  razorpayPaymentId: z.string().min(1, "Razorpay Payment ID is required"),
  razorpaySignature: z.string().min(1, "Razorpay Signature is required"),
});

export const refundPaymentSchema = z.object({
  refundReason: z.string().min(3, "Refund reason is required"),
});
