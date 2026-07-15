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

// Categories - Public
categoryRouter.get("/", blogController.getActiveCategories);

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
