import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as blogService from "./blog.service.js";

// Categories controller
export const getActiveCategories = asyncHandler(async (req, res) => {
  const categories = await blogService.getActiveCategories();
  return sendResponse(res, 200, "Categories retrieved successfully", categories);
});

export const getBlogCategoriesAdmin = asyncHandler(async (req, res) => {
  const categories = await blogService.getBlogCategoriesAdmin();
  return sendResponse(res, 200, "All categories retrieved for admin", categories);
});

export const createBlogCategory = asyncHandler(async (req, res) => {
  const category = await blogService.createBlogCategory(req.body);
  return sendResponse(res, 201, "Category created successfully", category);
});

export const updateBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await blogService.updateBlogCategory(id, req.body);
  return sendResponse(res, 200, "Category updated successfully", category);
});

export const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await blogService.deleteBlogCategory(id);
  return sendResponse(res, 200, result.message);
});

// Blog Posts controller
export const getPublishedBlogs = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const blogs = await blogService.getPublishedBlogs(category);
  return sendResponse(res, 200, "Blogs retrieved successfully", blogs);
});

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const blog = await blogService.getBlogBySlug(slug);
  return sendResponse(res, 200, "Blog details retrieved", blog);
});

export const getRelatedBlogs = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const blogs = await blogService.getRelatedBlogs(slug);
  return sendResponse(res, 200, "Related blogs retrieved", blogs);
});

export const getAllBlogsAdmin = asyncHandler(async (req, res) => {
  const blogs = await blogService.getAllBlogsAdmin();
  return sendResponse(res, 200, "All blogs retrieved for admin", blogs);
});

export const getBlogByIdAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await blogService.getBlogByIdAdmin(id);
  return sendResponse(res, 200, "Blog details retrieved for admin", blog);
});

export const createBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.createBlog(req.body);
  return sendResponse(res, 201, "Blog created successfully", blog);
});

export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await blogService.updateBlog(id, req.body);
  return sendResponse(res, 200, "Blog updated successfully", blog);
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await blogService.deleteBlog(id);
  return sendResponse(res, 200, result.message);
});
