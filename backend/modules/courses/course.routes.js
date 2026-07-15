import express from "express";
import * as courseController from "./course.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/authorizeRoles.js";
import validateRequest from "../../middlewares/validateRequest.js";
import {
  createCourseSchema,
  updateCourseSchema,
  createLessonSchema,
  updateLessonSchema,
  reorderCurriculumSchema,
  createCourseCategorySchema,
  updateCourseCategorySchema,
} from "./course.validator.js";

const router = express.Router();
const adminRouter = express.Router();
const categoryRouter = express.Router();
const adminCategoryRouter = express.Router();

// Categories - Public
categoryRouter.get("/", courseController.getActiveCategories);

// Categories - Admin
adminCategoryRouter.use(isAuthenticated, authorizeRoles("admin"));
adminCategoryRouter.get("/", courseController.getCourseCategoriesAdmin);
adminCategoryRouter.post("/", validateRequest(createCourseCategorySchema), courseController.createCourseCategory);
adminCategoryRouter.put("/:id", validateRequest(updateCourseCategorySchema), courseController.updateCourseCategory);
adminCategoryRouter.delete("/:id", courseController.deleteCourseCategory);

// Courses - Public
router.get("/", courseController.getPublishedCourses);
router.get("/:slug", courseController.getCourseBySlug);

// Courses - Admin (securing subpages)
adminRouter.use(isAuthenticated, authorizeRoles("admin", "instructor"));
adminRouter.get("/", courseController.getAllCoursesAdmin);
adminRouter.post("/", validateRequest(createCourseSchema), courseController.createCourse);
adminRouter.get("/:id", courseController.getCourseByIdAdmin);
adminRouter.put("/:id", validateRequest(updateCourseSchema), courseController.updateCourse);
adminRouter.delete("/:id", courseController.deleteCourse);

// Curriculum/Lessons - Admin
adminRouter.post("/:id/lessons", validateRequest(createLessonSchema), courseController.addLesson);
adminRouter.put("/:id/lessons/:lessonId", validateRequest(updateLessonSchema), courseController.updateLesson);
adminRouter.delete("/:id/lessons/:lessonId", courseController.deleteLesson);
adminRouter.put("/:id/curriculum-order", validateRequest(reorderCurriculumSchema), courseController.reorderCurriculum);

export {
  router as publicCourseRoutes,
  adminRouter as adminCourseRoutes,
  categoryRouter as publicCourseCategoryRoutes,
  adminCategoryRouter as adminCourseCategoryRoutes,
};
