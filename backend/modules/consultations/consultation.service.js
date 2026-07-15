import Consultation from "./consultation.model.js";
import Service from "../services/service.model.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";
import { sendBookingConfirmationEmail, sendBookingStatusEmail } from "../../services/emailService.js";

// Let's declare TIME_SLOTS internally if it isn't defined or import from constants
const MASTER_TIME_SLOTS = [
  "09:00 AM - 10:00 AM",
  "10:30 AM - 11:30 AM",
  "12:00 PM - 01:00 PM",
  "02:30 PM - 03:30 PM",
  "04:00 PM - 05:00 PM",
  "05:30 PM - 06:30 PM"
];

export const checkAvailability = async (dateStr, serviceId) => {
  const targetDate = new Date(dateStr);
  // Normalize date to start and end of day
  const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

  // Find all consultations that are not rejected or completed
  const bookings = await Consultation.find({
    preferredDate: { $gte: startOfDay, $lte: endOfDay },
    status: { $nin: ["rejected", "completed"] }
  });

  const bookedSlots = bookings.map((b) => b.preferredTimeSlot);
  const availableSlots = MASTER_TIME_SLOTS.filter((slot) => !bookedSlots.includes(slot));

  return availableSlots;
};

export const bookConsultation = async (userId, data) => {
  // Validate service exists
  const service = await Service.findById(data.service);
  if (!service) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  // Check if slot is taken
  const startOfDay = new Date(new Date(data.preferredDate).setHours(0, 0, 0, 0));
  const endOfDay = new Date(new Date(data.preferredDate).setHours(23, 59, 59, 999));

  const existingBooking = await Consultation.findOne({
    preferredDate: { $gte: startOfDay, $lte: endOfDay },
    preferredTimeSlot: data.preferredTimeSlot,
    status: { $nin: ["rejected"] }
  });

  if (existingBooking) {
    const error = new Error(ERROR_MESSAGES.SLOT_UNAVAILABLE);
    error.statusCode = 400;
    throw error;
  }

  const booking = await Consultation.create({
    ...data,
    user: userId,
    status: "pending"
  });

  // Send confirmation email
  sendBookingConfirmationEmail(
    data.email,
    data.name,
    service.title,
    new Date(data.preferredDate).toDateString(),
    data.preferredTimeSlot
  );

  return booking;
};

export const submitInquiry = async (data) => {
  // Store lead data or send email alerts. Here we simulate lead capture
  // We can return a standard success response
  return { message: "Inquiry received. Our team will contact you shortly." };
};

export const getMyConsultations = async (userId) => {
  return Consultation.find({ user: userId }).populate("service").sort({ createdAt: -1 });
};

export const getMyConsultationById = async (userId, id) => {
  const booking = await Consultation.findOne({ _id: id, user: userId }).populate("service");
  if (!booking) {
    const error = new Error(ERROR_MESSAGES.CONSULTATION_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return booking;
};

export const getAllConsultationsAdmin = async () => {
  return Consultation.find().populate("user").populate("service").sort({ createdAt: -1 });
};

export const getConsultationByIdAdmin = async (id) => {
  const booking = await Consultation.findById(id).populate("user").populate("service");
  if (!booking) {
    const error = new Error(ERROR_MESSAGES.CONSULTATION_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return booking;
};

export const updateConsultationStatus = async (id, data) => {
  const { status, adminNotes, rescheduledDate, rescheduledTimeSlot } = data;
  const booking = await Consultation.findById(id).populate("user").populate("service");

  if (!booking) {
    const error = new Error(ERROR_MESSAGES.CONSULTATION_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  booking.status = status;
  if (adminNotes) booking.adminNotes = adminNotes;

  if (status === "rescheduled") {
    if (!rescheduledDate || !rescheduledTimeSlot) {
      const error = new Error("Rescheduled date and time slot are required for rescheduling");
      error.statusCode = 400;
      throw error;
    }
    booking.rescheduledDate = rescheduledDate;
    booking.rescheduledTimeSlot = rescheduledTimeSlot;
  }

  if (status === "completed") {
    booking.completedAt = new Date();
  }

  await booking.save();

  // Send status update email
  sendBookingStatusEmail(booking.email, booking.name, status, adminNotes);

  return booking;
};
