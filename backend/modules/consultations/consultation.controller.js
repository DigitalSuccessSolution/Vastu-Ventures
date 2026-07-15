import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as consultationService from "./consultation.service.js";

export const checkAvailability = asyncHandler(async (req, res) => {
  const { date, serviceId } = req.query;
  if (!date) {
    return res.status(400).json({ success: false, message: "Date parameter is required" });
  }
  const availableSlots = await consultationService.checkAvailability(date, serviceId);
  return sendResponse(res, 200, "Available slots retrieved", availableSlots);
});

export const bookConsultation = asyncHandler(async (req, res) => {
  const booking = await consultationService.bookConsultation(req.user._id, req.body);
  return sendResponse(res, 201, "Consultation booked successfully", booking);
});

export const submitInquiry = asyncHandler(async (req, res) => {
  const result = await consultationService.submitInquiry(req.body);
  return sendResponse(res, 200, result.message);
});

export const getMyConsultations = asyncHandler(async (req, res) => {
  const bookings = await consultationService.getMyConsultations(req.user._id);
  return sendResponse(res, 200, "My consultations retrieved", bookings);
});

export const getMyConsultationById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await consultationService.getMyConsultationById(req.user._id, id);
  return sendResponse(res, 200, "Consultation booking details retrieved", booking);
});

export const getAllConsultationsAdmin = asyncHandler(async (req, res) => {
  const bookings = await consultationService.getAllConsultationsAdmin();
  return sendResponse(res, 200, "All consultations retrieved for admin", bookings);
});

export const getConsultationByIdAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await consultationService.getConsultationByIdAdmin(id);
  return sendResponse(res, 200, "Consultation detail retrieved", booking);
});

export const updateConsultationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await consultationService.updateConsultationStatus(id, req.body);
  return sendResponse(res, 200, "Consultation status updated successfully", booking);
});
