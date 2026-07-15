import crypto from "crypto";
import razorpayInstance from "../../config/razorpay.js";
import Payment from "./payment.model.js";
import Invoice from "./invoice.model.js";
import Course from "../courses/course.model.js";
import Consultation from "../consultations/consultation.model.js";
import Enrollment from "../enrollments/enrollment.model.js";
import User from "../users/user.model.js";
import Notification from "../notifications/notification.model.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";
import { sendPaymentSuccessEmail } from "../../services/emailService.js";
import { generateInvoicePDF } from "../../services/pdfService.js";
import { uploadToCloudinary } from "../../services/cloudinaryService.js";
import env from "../../config/env.js";

export const createOrder = async (userId, data) => {
  const { orderType, courseId, consultationId } = data;
  let amount = 0;
  let receipt = "";

  if (orderType === "course") {
    if (!courseId) throw new Error("Course ID is required for course orders");
    const course = await Course.findById(courseId);
    if (!course) throw new Error(ERROR_MESSAGES.COURSE_NOT_FOUND);

    // Check if already enrolled
    const existing = await Enrollment.findOne({ user: userId, course: courseId });
    if (existing) {
      const error = new Error(ERROR_MESSAGES.ALREADY_ENROLLED);
      error.statusCode = 400;
      throw error;
    }

    amount = course.price * 100; // in paise
    receipt = `rcpt_course_${courseId.slice(-6)}_${Date.now().toString().slice(-4)}`;
  } else if (orderType === "consultation") {
    if (!consultationId) throw new Error("Consultation ID is required for consultation orders");
    const consultation = await Consultation.findById(consultationId).populate("service");
    if (!consultation) throw new Error(ERROR_MESSAGES.CONSULTATION_NOT_FOUND);

    amount = consultation.service.price * 100; // in paise
    receipt = `rcpt_consult_${consultationId.slice(-6)}_${Date.now().toString().slice(-4)}`;
  }

  // Call Razorpay API
  const options = {
    amount,
    currency: "INR",
    receipt,
  };

  const razorpayOrder = await razorpayInstance.orders.create(options);

  // Store initial Payment doc
  const payment = await Payment.create({
    user: userId,
    orderType,
    course: courseId || undefined,
    consultation: consultationId || undefined,
    amount,
    razorpayOrderId: razorpayOrder.id,
    status: "created"
  });

  return {
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    key_id: env.RAZORPAY_KEY_ID
  };
};

export const verifyPayment = async (userId, verificationData) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = verificationData;

  // Check expected signature
  const text = `${razorpayOrderId}|${razorpayPaymentId}`;
  const generatedSignature = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(text)
    .digest("hex");

  if (generatedSignature !== razorpaySignature) {
    // Mark payment as failed
    await Payment.findOneAndUpdate({ razorpayOrderId }, { $set: { status: "failed" } });
    const error = new Error(ERROR_MESSAGES.PAYMENT_VERIFICATION_FAILED);
    error.statusCode = 400;
    throw error;
  }

  // Fetch payment doc
  const payment = await Payment.findOne({ razorpayOrderId });
  if (!payment) {
    const error = new Error(ERROR_MESSAGES.PAYMENT_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (payment.status === "paid") {
    return { status: "paid", paymentId: payment._id };
  }

  // Update status
  payment.status = "paid";
  payment.razorpayPaymentId = razorpayPaymentId;
  payment.razorpaySignature = razorpaySignature;
  payment.paidAt = new Date();
  await payment.save();

  // Process success fulfill logic
  await fulfillPayment(payment);

  return { status: "paid", paymentId: payment._id };
};

export const handleWebhook = async (rawBody, signature) => {
  // Validate Webhook Signature
  const expectedSignature = crypto
    .createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (expectedSignature !== signature) {
    const error = new Error(ERROR_MESSAGES.WEBHOOK_SIGNATURE_INVALID);
    error.statusCode = 400;
    throw error;
  }

  const event = JSON.parse(rawBody);

  if (event.event === "payment.captured") {
    const orderId = event.payload.payment.entity.order_id;
    const payment = await Payment.findOne({ razorpayOrderId: orderId });

    if (payment && payment.status !== "paid") {
      payment.status = "paid";
      payment.razorpayPaymentId = event.payload.payment.entity.id;
      payment.paidAt = new Date();
      await payment.save();

      await fulfillPayment(payment);
    }
  }

  return { received: true };
};

// Internal fulfill helper
const fulfillPayment = async (payment) => {
  const user = await User.findById(payment.user);
  let itemName = "";

  if (payment.orderType === "course") {
    // Create enrollment
    await Enrollment.create({
      user: payment.user,
      course: payment.course,
      payment: payment._id,
      enrolledAt: new Date()
    });

    const course = await Course.findByIdAndUpdate(payment.course, { $inc: { enrollmentCount: 1 } });
    itemName = course.title;

    await Notification.create({
      user: payment.user,
      type: "payment_success",
      title: "Enrollment Confirmed!",
      message: `You are now enrolled in ${course.title}. Start learning today!`,
      link: `/dashboard/courses/${course.slug}`
    });
  } else if (payment.orderType === "consultation") {
    // Bind payment to appointment booking
    const consultation = await Consultation.findByIdAndUpdate(payment.consultation, {
      $set: { payment: payment._id }
    }).populate("service");
    itemName = consultation.service.title;

    await Notification.create({
      user: payment.user,
      type: "payment_success",
      title: "Consultation Confirmed!",
      message: `Your payment for ${consultation.service.title} was processed. View details in history.`,
      link: "/dashboard/appointments"
    });
  }

  // Generate Invoice PDF
  const invoiceNumber = `VV-INV-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
  const amountVal = payment.amount / 100;
  const gst = Math.round(amountVal * 0.18); // 18% GST example
  const total = amountVal + gst;

  const pdfBuffer = await generateInvoicePDF({
    invoiceNumber,
    studentName: `${user.firstName} ${user.lastName}`,
    item: itemName,
    amount: amountVal,
    gstAmount: gst,
    totalAmount: total,
    date: new Date().toDateString()
  });

  // Upload Invoice to Cloudinary raw files
  const uploadResult = await uploadToCloudinary(pdfBuffer, "vastuvidya/invoices", "raw");

  await Invoice.create({
    invoiceNumber,
    payment: payment._id,
    user: payment.user,
    amount: amountVal,
    gstAmount: gst,
    totalAmount: total,
    pdfUrl: uploadResult.url,
    pdfPublicId: uploadResult.publicId,
    issuedAt: new Date()
  });

  // Trigger Transactional Email
  sendPaymentSuccessEmail(user.email, `${user.firstName} ${user.lastName}`, amountVal, itemName);
};

export const getMyPayments = async (userId) => {
  return Payment.find({ user: userId }).populate("course").populate("consultation").sort({ createdAt: -1 });
};

export const getPaymentDetail = async (userId, id) => {
  const payment = await Payment.findOne({ _id: id, user: userId }).populate("course").populate("consultation");
  if (!payment) {
    const error = new Error(ERROR_MESSAGES.PAYMENT_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  const invoice = await Invoice.findOne({ payment: id });
  return { payment, invoice };
};

export const downloadInvoice = async (userId, id) => {
  const invoice = await Invoice.findOne({ payment: id, user: userId });
  if (!invoice) {
    const error = new Error("Invoice not found for this payment record");
    error.statusCode = 404;
    throw error;
  }
  return invoice.pdfUrl;
};

export const getAllPaymentsAdmin = async () => {
  return Payment.find().populate("user").populate("course").populate("consultation").sort({ createdAt: -1 });
};

export const refundPayment = async (id, refundReason) => {
  const payment = await Payment.findById(id);
  if (!payment) {
    const error = new Error(ERROR_MESSAGES.PAYMENT_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  // Update refund status (manual flow)
  payment.status = "refunded";
  payment.refundStatus = "processed";
  payment.refundReason = refundReason;
  await payment.save();

  // If course enrollment was created, we soft delete it / block access
  if (payment.orderType === "course") {
    await Enrollment.findOneAndDelete({ user: payment.user, course: payment.course });
  }

  return payment;
};
