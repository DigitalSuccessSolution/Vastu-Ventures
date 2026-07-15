import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as enrollmentService from "./enrollment.service.js";

export const getEnrolledCourseData = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const data = await enrollmentService.getEnrolledCourseData(req.user._id, courseId);
  return sendResponse(res, 200, "Enrolled course progress retrieved", data);
});

export const getLessonContent = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;
  const lesson = await enrollmentService.getLessonContent(req.user._id, courseId, lessonId);
  return sendResponse(res, 200, "Lesson content retrieved", lesson);
});

export const updateWatchProgress = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;
  const { watchPercentage } = req.body;
  const progress = await enrollmentService.updateWatchProgress(req.user._id, courseId, lessonId, watchPercentage);
  return sendResponse(res, 200, "Watch progress updated", progress);
});

export const markLessonCompleted = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;
  const result = await enrollmentService.markLessonCompleted(req.user._id, courseId, lessonId);
  return sendResponse(res, 200, "Lesson marked as completed", result);
});

export const getContinueLearning = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const lesson = await enrollmentService.getContinueLearning(req.user._id, courseId);
  return sendResponse(res, 200, "Continue learning lesson pointer retrieved", lesson);
});
