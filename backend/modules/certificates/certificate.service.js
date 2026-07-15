import Certificate from "./certificate.model.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";

export const getMyCertificates = async (userId) => {
  return Certificate.find({ user: userId }).populate("course");
};

export const downloadCertificate = async (userId, id) => {
  const certificate = await Certificate.findOne({ _id: id, user: userId });
  if (!certificate) {
    const error = new Error(ERROR_MESSAGES.CERTIFICATE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return certificate.pdfUrl;
};

export const verifyCertificate = async (certificateId) => {
  const certificate = await Certificate.findOne({ certificateId })
    .populate({
      path: "user",
      select: "firstName lastName"
    })
    .populate({
      path: "course",
      select: "title duration"
    });

  if (!certificate) {
    const error = new Error(ERROR_MESSAGES.CERTIFICATE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  return {
    valid: true,
    certificateId: certificate.certificateId,
    studentName: `${certificate.user.firstName} ${certificate.user.lastName}`,
    courseName: certificate.course.title,
    duration: certificate.course.duration,
    issuedAt: certificate.issuedAt
  };
};
