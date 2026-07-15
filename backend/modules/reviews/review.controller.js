import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as reviewService from "./review.service.js";

export const submitReview = asyncHandler(async (req, res) => {
  const review = await reviewService.submitReview(req.user._id, req.body);
  return sendResponse(res, 201, "Review submitted and pending admin approval", review);
});

export const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getMyReviews(req.user._id);
  return sendResponse(res, 200, "My reviews retrieved", reviews);
});

export const getAllReviewsAdmin = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getAllReviewsAdmin();
  return sendResponse(res, 200, "All reviews retrieved for admin", reviews);
});

export const approveReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const review = await reviewService.approveReview(id);
  return sendResponse(res, 200, "Review approved successfully", review);
});

export const rejectReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const review = await reviewService.rejectReview(id);
  return sendResponse(res, 200, "Review status set to unapproved", review);
});

export const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await reviewService.deleteReview(id);
  return sendResponse(res, 200, result.message);
});
