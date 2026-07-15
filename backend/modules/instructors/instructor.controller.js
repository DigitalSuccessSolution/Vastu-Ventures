import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as instructorService from "./instructor.service.js";

export const getAllInstructors = asyncHandler(async (req, res) => {
  const instructors = await instructorService.getAllInstructors();
  return sendResponse(res, 200, "Instructors list retrieved", instructors);
});

export const getInstructorDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const details = await instructorService.getInstructorDetails(id);
  return sendResponse(res, 200, "Instructor details retrieved", details);
});

export const createInstructor = asyncHandler(async (req, res) => {
  const instructor = await instructorService.createInstructor(req.body);
  return sendResponse(res, 201, "Instructor created successfully", instructor);
});

export const updateInstructor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const instructor = await instructorService.updateInstructor(id, req.body);
  return sendResponse(res, 200, "Instructor profile updated", instructor);
});

export const deactivateInstructor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await instructorService.deactivateInstructor(id);
  return sendResponse(res, 200, result.message);
});

export const assignCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { courseId } = req.body;
  const course = await instructorService.assignCourse(id, courseId);
  return sendResponse(res, 200, "Course assigned to instructor successfully", course);
});
