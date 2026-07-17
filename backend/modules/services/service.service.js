import Service from "./service.model.js";
import slugify from "../../utils/slugify.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";

export const getActiveServices = async (categorySlug) => {
  const query = { isActive: true };
  if (categorySlug) {
    query.category = categorySlug;
  }
  return Service.find(query);
};

export const getServiceBySlug = async (slug) => {
  const service = await Service.findOne({ slug, isActive: true })
    .populate("faqs")
    .populate("relatedServices");
  if (!service) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return service;
};

export const getAllServicesAdmin = async () => {
  return Service.find();
};

export const getServiceByIdAdmin = async (id) => {
  const service = await Service.findById(id);
  if (!service) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return service;
};

export const createService = async (data) => {
  const slug = slugify(data.title);
  const existing = await Service.findOne({ slug });
  if (existing) {
    const error = new Error("Service with a similar title already exists");
    error.statusCode = 409;
    throw error;
  }
  return Service.create({ ...data, slug });
};

export const updateService = async (id, data) => {
  const updatePayload = { ...data };
  if (data.title) {
    updatePayload.slug = slugify(data.title);
  }
  const service = await Service.findByIdAndUpdate(id, { $set: updatePayload }, { new: true, runValidators: true });
  if (!service) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return service;
};

export const deleteService = async (id) => {
  const service = await Service.findByIdAndDelete(id);
  if (!service) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return { message: "Service deleted successfully" };
};
