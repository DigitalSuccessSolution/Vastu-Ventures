import express from "express";
import * as instructorController from "./instructor.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/authorizeRoles.js";
import validateRequest from "../../middlewares/validateRequest.js";
import {
  createInstructorSchema,
  updateInstructorSchema,
  assignCourseSchema,
} from "./instructor.validator.js";

const router = express.Router();

// Admin routes (secured under /api/v1/admin prefix)
router.use(isAuthenticated, authorizeRoles("admin"));

router.get("/", instructorController.getAllInstructors);
router.post("/", validateRequest(createInstructorSchema), instructorController.createInstructor);
router.get("/:id", instructorController.getInstructorDetails);
router.put("/:id", validateRequest(updateInstructorSchema), instructorController.updateInstructor);
router.delete("/:id", instructorController.deactivateInstructor);
router.post("/:id/assign-course", validateRequest(assignCourseSchema), instructorController.assignCourse);

export default router;
