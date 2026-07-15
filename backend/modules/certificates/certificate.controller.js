import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import * as certificateService from "./certificate.service.js";

export const getMyCertificates = asyncHandler(async (req, res) => {
  const certificates = await certificateService.getMyCertificates(req.user._id);
  return sendResponse(res, 200, "My certificates retrieved", certificates);
});

export const downloadCertificate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pdfUrl = await certificateService.downloadCertificate(req.user._id, id);
  return sendResponse(res, 200, "Certificate download URL generated", { downloadUrl: pdfUrl });
});

export const verifyCertificate = asyncHandler(async (req, res) => {
  const { certificateId } = req.params;
  const verification = await certificateService.verifyCertificate(certificateId);
  return sendResponse(res, 200, "Certificate verified successfully", verification);
});
