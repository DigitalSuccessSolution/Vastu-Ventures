import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as courseService from "./course.service.js";

// Categories controller
export const getActiveCategories = asyncHandler(async (req, res) => {
  const categories = await courseService.getActiveCategories();
  return sendResponse(res, 200, "Categories retrieved successfully", categories);
});

export const getCourseCategoriesAdmin = asyncHandler(async (req, res) => {
  const categories = await courseService.getCourseCategoriesAdmin();
  return sendResponse(res, 200, "All categories retrieved for admin", categories);
});

export const createCourseCategory = asyncHandler(async (req, res) => {
  const category = await courseService.createCourseCategory(req.body);
  return sendResponse(res, 201, "Category created successfully", category);
});

export const updateCourseCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await courseService.updateCourseCategory(id, req.body);
  return sendResponse(res, 200, "Category updated successfully", category);
});

export const deleteCourseCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.deleteCourseCategory(id);
  return sendResponse(res, 200, result.message);
});

// Courses controller
export const getPublishedCourses = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const courses = await courseService.getPublishedCourses(category);
  return sendResponse(res, 200, "Courses retrieved successfully", courses);
});

export const getCourseBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const course = await courseService.getCourseBySlug(slug);
  return sendResponse(res, 200, "Course details retrieved", course);
});

export const getAllCoursesAdmin = asyncHandler(async (req, res) => {
  const courses = await courseService.getAllCoursesAdmin();
  return sendResponse(res, 200, "All courses retrieved for admin", courses);
});

export const getCourseByIdAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await courseService.getCourseByIdAdmin(id);
  return sendResponse(res, 200, "Course details retrieved for admin", course);
});

export const createCourse = asyncHandler(async (req, res) => {
  const course = await courseService.createCourse(req.body);
  return sendResponse(res, 201, "Course created successfully", course);
});

export const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await courseService.updateCourse(id, req.body);
  return sendResponse(res, 200, "Course updated successfully", course);
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.deleteCourse(id);
  return sendResponse(res, 200, result.message);
});

export const addLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const lesson = await courseService.addLesson(id, req.body);
  return sendResponse(res, 211, "Lesson added successfully", lesson);
});

export const updateLesson = asyncHandler(async (req, res) => {
  const { id, lessonId } = req.params;
  const lesson = await courseService.updateLesson(id, lessonId, req.body);
  return sendResponse(res, 200, "Lesson updated successfully", lesson);
});

export const deleteLesson = asyncHandler(async (req, res) => {
  const { id, lessonId } = req.params;
  const result = await courseService.deleteLesson(id, lessonId);
  return sendResponse(res, 200, result.message);
});

export const reorderCurriculum = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const curriculum = await courseService.reorderCurriculum(id, req.body);
  return sendResponse(res, 200, "Curriculum reordered successfully", curriculum);
});

export const uploadFileToCloudinary = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  let resourceType = "image";
  let folder = "vastuventures/images";
  
  const mime = req.file.mimetype;
  if (mime === "application/pdf") {
    resourceType = "raw";
    folder = "vastuventures/documents";
  } else if (mime.startsWith("video/")) {
    resourceType = "video";
    folder = "vastuventures/videos";
  }

  const { uploadToCloudinary } = await import("../../services/cloudinaryService.js");
  const uploadResult = await uploadToCloudinary(req.file.buffer, folder, resourceType, req.file.originalname);

  return sendResponse(res, 200, "File uploaded successfully to Cloudinary", uploadResult);
});
