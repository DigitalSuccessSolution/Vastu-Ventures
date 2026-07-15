import express from "express";
import * as vastuCategoryController from "./vastuCategory.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/authorizeRoles.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { createVastuCategorySchema, updateVastuCategorySchema } from "./vastuCategory.validator.js";

const router = express.Router();
const adminRouter = express.Router();

// Public routes
router.get("/", vastuCategoryController.getActiveCategories);
router.get("/:slug", vastuCategoryController.getCategoryBySlug);

// Admin routes (Will be secured under /api/v1/admin prefix)
adminRouter.use(isAuthenticated, authorizeRoles("admin"));
adminRouter.get("/", vastuCategoryController.getAllCategoriesAdmin);
adminRouter.post("/", validateRequest(createVastuCategorySchema), vastuCategoryController.createCategory);
adminRouter.put("/:id", validateRequest(updateVastuCategorySchema), vastuCategoryController.updateCategory);
adminRouter.delete("/:id", vastuCategoryController.deleteCategory);

export { router as publicCategoryRoutes, adminRouter as adminCategoryRoutes };
