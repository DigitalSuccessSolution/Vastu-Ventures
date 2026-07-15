import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as faqService from "./faq.service.js";

export const getFaqsPublic = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const faqs = await faqService.getFaqsPublic(category);
  return sendResponse(res, 200, "FAQs retrieved successfully", faqs);
});

export const getAllFaqsAdmin = asyncHandler(async (req, res) => {
  const faqs = await faqService.getAllFaqsAdmin();
  return sendResponse(res, 200, "All FAQs retrieved for admin", faqs);
});

export const createFaq = asyncHandler(async (req, res) => {
  const faq = await faqService.createFaq(req.body);
  return sendResponse(res, 201, "FAQ created successfully", faq);
});

export const updateFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const faq = await faqService.updateFaq(id, req.body);
  return sendResponse(res, 200, "FAQ updated successfully", faq);
});

export const deleteFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await faqService.deleteFaq(id);
  return sendResponse(res, 200, result.message);
});
