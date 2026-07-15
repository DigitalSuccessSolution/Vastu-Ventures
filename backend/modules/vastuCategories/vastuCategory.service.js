import VastuCategory from "./vastuCategory.model.js";
import Service from "../services/service.model.js";
import slugify from "../../utils/slugify.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";

export const getActiveCategories = async () => {
  return VastuCategory.find({ isActive: true }).sort({ order: 1 });
};

export const getCategoryBySlug = async (slug) => {
  const category = await VastuCategory.findOne({ slug, isActive: true });
  if (!category) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  const services = await Service.find({ category: category._id, isActive: true });
  return { category, services };
};

export const getAllCategoriesAdmin = async () => {
  return VastuCategory.find().sort({ order: 1 });
};

export const createCategory = async (data) => {
  const slug = slugify(data.name);
  const existing = await VastuCategory.findOne({ slug });
  if (existing) {
    const error = new Error("Category with similar name already exists");
    error.statusCode = 409;
    throw error;
  }
  return VastuCategory.create({ ...data, slug });
};

export const updateCategory = async (id, data) => {
  const updatePayload = { ...data };
  if (data.name) {
    updatePayload.slug = slugify(data.name);
  }
  const category = await VastuCategory.findByIdAndUpdate(id, { $set: updatePayload }, { new: true, runValidators: true });
  if (!category) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return category;
};

export const deleteCategory = async (id) => {
  // Check if there are active services linked to this category
  const linkedServicesCount = await Service.countDocuments({ category: id });
  if (linkedServicesCount > 0) {
    const error = new Error("Cannot delete category containing linked services. Reassign services first.");
    error.statusCode = 400;
    throw error;
  }
  const category = await VastuCategory.findByIdAndDelete(id);
  if (!category) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return { message: "Category deleted successfully" };
};
