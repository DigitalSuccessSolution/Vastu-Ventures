import express from "express";
import multer from "multer";
import * as architectureController from "./architecture.controller.js";

const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB limits

const publicArchitectureRoutes = express.Router();
const publicArchitectureCategoryRoutes = express.Router();

const adminArchitectureRoutes = express.Router();
const adminArchitectureCategoryRoutes = express.Router();

// ================= PUBLIC ROUTES =================
// Public categories (for Navbar & homepage dropdown)
publicArchitectureCategoryRoutes.get("/", architectureController.getPublicCategories);
publicArchitectureCategoryRoutes.get("/:slug", architectureController.getPublicCategoryPlans);

// Public single plan by slug
publicArchitectureRoutes.get("/plans/:planSlug", architectureController.getPublicPlanBySlug);

// ================= ADMIN ROUTES =================
// Admin categories
adminArchitectureCategoryRoutes.get("/", architectureController.getAdminCategories);
adminArchitectureCategoryRoutes.post("/", architectureController.createCategory);
adminArchitectureCategoryRoutes.delete("/:id", architectureController.deleteCategory);

// Admin plans
adminArchitectureRoutes.get("/", architectureController.getAdminPlans);
adminArchitectureRoutes.post("/", architectureController.createPlan);
adminArchitectureRoutes.put("/:id", architectureController.updatePlan);
adminArchitectureRoutes.delete("/:id", architectureController.deletePlan);
adminArchitectureRoutes.patch("/:id/status", architectureController.togglePlanStatus);
adminArchitectureRoutes.post("/upload", upload.single("file"), architectureController.uploadArchitectureFile);

export {
  publicArchitectureRoutes,
  publicArchitectureCategoryRoutes,
  adminArchitectureRoutes,
  adminArchitectureCategoryRoutes
};
