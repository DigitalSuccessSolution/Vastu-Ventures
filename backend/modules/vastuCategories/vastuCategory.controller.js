import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as vastuCategoryService from "./vastuCategory.service.js";

export const getActiveCategories = asyncHandler(async (req, res) => {
  const categories = await vastuCategoryService.getActiveCategories();
  return sendResponse(res, 200, "Categories retrieved successfully", categories);
});

export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const data = await vastuCategoryService.getCategoryBySlug(slug);
  return sendResponse(res, 200, "Category and services retrieved", data);
});

export const getAllCategoriesAdmin = asyncHandler(async (req, res) => {
  const categories = await vastuCategoryService.getAllCategoriesAdmin();
  return sendResponse(res, 200, "All categories retrieved for admin", categories);
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await vastuCategoryService.createCategory(req.body);
  return sendResponse(res, 201, "Category created successfully", category);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await vastuCategoryService.updateCategory(id, req.body);
  return sendResponse(res, 200, "Category updated successfully", category);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await vastuCategoryService.deleteCategory(id);
  return sendResponse(res, 200, result.message);
});
