import express from "express";
import * as serviceController from "./service.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/authorizeRoles.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { createServiceSchema, updateServiceSchema } from "./service.validator.js";

const router = express.Router();
const adminRouter = express.Router();

// Public routes
router.get("/", serviceController.getActiveServices);
router.get("/:slug", serviceController.getServiceBySlug);

// Admin routes (Will be secured under /api/v1/admin prefix)
adminRouter.use(isAuthenticated, authorizeRoles("admin"));
adminRouter.get("/", serviceController.getAllServicesAdmin);
adminRouter.post("/", validateRequest(createServiceSchema), serviceController.createService);
adminRouter.get("/:id", serviceController.getServiceByIdAdmin);
adminRouter.put("/:id", validateRequest(updateServiceSchema), serviceController.updateService);
adminRouter.delete("/:id", serviceController.deleteService);

export { router as publicServiceRoutes, adminRouter as adminServiceRoutes };
