import FAQ from "./faq.model.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";

export const getFaqsPublic = async (category) => {
  const query = { isActive: true };
  if (category) query.category = category;
  return FAQ.find(query).sort({ order: 1 });
};

export const getAllFaqsAdmin = async () => {
  return FAQ.find().sort({ order: 1 });
};

export const createFaq = async (data) => {
  return FAQ.create(data);
};

export const updateFaq = async (id, data) => {
  const faq = await FAQ.findByIdAndUpdate(id, { $set: data }, { new: true });
  if (!faq) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return faq;
};

export const deleteFaq = async (id) => {
  const faq = await FAQ.findByIdAndDelete(id);
  if (!faq) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return { message: "FAQ deleted successfully" };
};
