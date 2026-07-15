import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as serviceService from "./service.service.js";

export const getActiveServices = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const services = await serviceService.getActiveServices(category);
  return sendResponse(res, 200, "Services retrieved successfully", services);
});

export const getServiceBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const service = await serviceService.getServiceBySlug(slug);
  return sendResponse(res, 200, "Service details retrieved", service);
});

export const getAllServicesAdmin = asyncHandler(async (req, res) => {
  const services = await serviceService.getAllServicesAdmin();
  return sendResponse(res, 200, "All services retrieved for admin", services);
});

export const getServiceByIdAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await serviceService.getServiceByIdAdmin(id);
  return sendResponse(res, 200, "Service detail retrieved for admin", service);
});

export const createService = asyncHandler(async (req, res) => {
  const service = await serviceService.createService(req.body);
  return sendResponse(res, 201, "Service created successfully", service);
});

export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await serviceService.updateService(id, req.body);
  return sendResponse(res, 200, "Service updated successfully", service);
});

export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await serviceService.deleteService(id);
  return sendResponse(res, 200, result.message);
});
