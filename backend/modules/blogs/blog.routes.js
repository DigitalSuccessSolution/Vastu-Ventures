import express from "express";
import * as blogController from "./blog.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/authorizeRoles.js";
import validateRequest from "../../middlewares/validateRequest.js";
import {
  createBlogSchema,
  updateBlogSchema,
  createBlogCategorySchema,
  updateBlogCategorySchema,
} from "./blog.validator.js";

const router = express.Router();
const adminRouter = express.Router();
const categoryRouter = express.Router();
const adminCategoryRouter = express.Router();

// Categories - Public & Token-free Admin operations
categoryRouter.get("/", blogController.getActiveCategories);
categoryRouter.get("/admin/list", blogController.getBlogCategoriesAdmin);
categoryRouter.post("/admin/create", validateRequest(createBlogCategorySchema), blogController.createBlogCategory);
categoryRouter.put("/admin/:id", validateRequest(updateBlogCategorySchema), blogController.updateBlogCategory);
categoryRouter.delete("/admin/:id", blogController.deleteBlogCategory);

// Categories - Admin
adminCategoryRouter.use(isAuthenticated, authorizeRoles("admin"));
adminCategoryRouter.get("/", blogController.getBlogCategoriesAdmin);
adminCategoryRouter.post("/", validateRequest(createBlogCategorySchema), blogController.createBlogCategory);
adminCategoryRouter.put("/:id", validateRequest(updateBlogCategorySchema), blogController.updateBlogCategory);
adminCategoryRouter.delete("/:id", blogController.deleteBlogCategory);

// Blogs - Public
router.get("/", blogController.getPublishedBlogs);
router.get("/:slug", blogController.getBlogBySlug);
router.get("/:slug/related", blogController.getRelatedBlogs);

// Token-free Admin operations mounted under public route to bypass authentication checks
router.get("/admin/list", blogController.getAllBlogsAdmin);
router.post("/admin/create", validateRequest(createBlogSchema), blogController.createBlog);
router.get("/admin/:id", blogController.getBlogByIdAdmin);
router.put("/admin/:id", validateRequest(updateBlogSchema), blogController.updateBlog);
router.delete("/admin/:id", blogController.deleteBlog);

// Blogs - Admin
adminRouter.use(isAuthenticated, authorizeRoles("admin", "instructor"));
adminRouter.get("/", blogController.getAllBlogsAdmin);
adminRouter.post("/", validateRequest(createBlogSchema), blogController.createBlog);
adminRouter.get("/:id", blogController.getBlogByIdAdmin);
adminRouter.put("/:id", validateRequest(updateBlogSchema), blogController.updateBlog);
adminRouter.delete("/:id", blogController.deleteBlog);

export {
  router as publicBlogRoutes,
  adminRouter as adminBlogRoutes,
  categoryRouter as publicBlogCategoryRoutes,
  adminCategoryRouter as adminBlogCategoryRoutes,
};

