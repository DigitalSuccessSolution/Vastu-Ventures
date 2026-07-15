import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderType: { type: String, enum: ["course", "consultation"], required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    consultation: { type: mongoose.Schema.Types.ObjectId, ref: "Consultation" },
    amount: { type: Number, required: [true, "Amount is required"], min: 0 },
    currency: { type: String, default: "INR" },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String, default: "" },
    razorpaySignature: { type: String, default: "" },
    status: {
      type: String,
      enum: ["created", "paid", "failed", "refunded"],
      default: "created",
    },
    refundStatus: {
      type: String,
      enum: ["none", "requested", "processed"],
      default: "none",
    },
    refundReason: { type: String, default: "" },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

paymentSchema.index({ razorpayOrderId: 1 });
paymentSchema.index({ user: 1 });
paymentSchema.index({ status: 1 });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
