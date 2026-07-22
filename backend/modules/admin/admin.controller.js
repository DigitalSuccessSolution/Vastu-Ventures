import User from "../users/user.model.js";
import Enrollment from "../enrollments/enrollment.model.js";
import Payment from "../payments/payment.model.js";
import Consultation from "../consultations/consultation.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/responseFormatter.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";

// List all students
export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await User.find({ role: "student" }).sort({ createdAt: -1 });
  return sendResponse(res, 200, "Students list retrieved", students);
});

// View student profile detail + activities
export const getStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await User.findOne({ _id: id, role: "student" });
  if (!student) {
    return res.status(404).json({ success: false, message: ERROR_MESSAGES.USER_NOT_FOUND });
  }

  const enrollments = await Enrollment.find({ user: id }).populate("course");
  const payments = await Payment.find({ user: id }).populate("course").populate("consultation");
  const consultations = await Consultation.find({ user: id }).populate("service");

  return sendResponse(res, 200, "Student details and activity logs retrieved", {
    student,
    enrollments,
    payments,
    consultations
  });
});

// Block/Unblock student
export const toggleBlockStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { block } = req.body; // boolean

  const student = await User.findOneAndUpdate(
    { _id: id, role: "student" },
    { $set: { isBlocked: block } },
    { returnDocument: "after" }
  );

  if (!student) {
    return res.status(404).json({ success: false, message: ERROR_MESSAGES.USER_NOT_FOUND });
  }

  const msg = block ? "Student blocked successfully" : "Student unblocked successfully";
  return sendResponse(res, 200, msg, student);
});
