import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as analyticsService from "./analytics.service.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getDashboardStats();
  return sendResponse(res, 200, "Dashboard stats retrieved", stats);
});

export const getRecentPayments = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const payments = await analyticsService.getRecentPayments(limit);
  return sendResponse(res, 200, "Recent payments retrieved", payments);
});

export const getRecentUsers = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const users = await analyticsService.getRecentUsers(limit);
  return sendResponse(res, 200, "Recent users retrieved", users);
});

export const getPopularCourses = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const courses = await analyticsService.getPopularCourses(limit);
  return sendResponse(res, 200, "Popular courses retrieved", courses);
});

export const getConsultationStats = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getConsultationStats();
  return sendResponse(res, 200, "Consultation status stats retrieved", stats);
});

export const getRevenueTrend = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return res.status(400).json({ success: false, message: "startDate and endDate parameters are required" });
  }
  const trend = await analyticsService.getRevenueTrend(startDate, endDate);
  return sendResponse(res, 200, "Revenue trend retrieved", trend);
});
