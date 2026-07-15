import express from "express";
import * as certificateController from "./certificate.controller.js";
import isAuthenticated from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Public certificate verification
router.get("/verify/:certificateId", certificateController.verifyCertificate);

// Authenticated Student certificates access
router.get("/my", isAuthenticated, certificateController.getMyCertificates);
router.get("/my/:id/download", isAuthenticated, certificateController.downloadCertificate);

export default router;
