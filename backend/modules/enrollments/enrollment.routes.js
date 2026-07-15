import express from "express";
import * as enrollmentController from "./enrollment.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { updateWatchProgressSchema } from "./enrollment.validator.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/:courseId", enrollmentController.getEnrolledCourseData);
router.get("/:courseId/continue", enrollmentController.getContinueLearning);
router.get("/:courseId/lesson/:lessonId", enrollmentController.getLessonContent);
router.post("/:courseId/lesson/:lessonId/progress", validateRequest(updateWatchProgressSchema), enrollmentController.updateWatchProgress);
router.post("/:courseId/lesson/:lessonId/complete", enrollmentController.markLessonCompleted);

export default router;
