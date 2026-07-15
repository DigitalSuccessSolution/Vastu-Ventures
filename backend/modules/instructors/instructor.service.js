import Instructor from "./instructor.model.js";
import User from "../users/user.model.js";
import Course from "../courses/course.model.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";

export const getAllInstructors = async () => {
  return Instructor.find({ isActive: true }).populate("user", "email firstName lastName");
};

export const getInstructorDetails = async (id) => {
  const instructor = await Instructor.findById(id).populate("user", "email firstName lastName");
  if (!instructor) {
    const error = new Error("Instructor record not found");
    error.statusCode = 404;
    throw error;
  }
  const courses = await Course.find({ instructor: id });
  return { instructor, courses };
};

export const createInstructor = async (data) => {
  const { email, password, firstName, lastName, displayName, bio, specializations, socialLinks } = data;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    error.statusCode = 409;
    throw error;
  }

  // Create User with role instructor
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: "instructor",
    isEmailVerified: true
  });

  // Create Instructor record
  const instructor = await Instructor.create({
    user: user._id,
    displayName,
    bio,
    specializations,
    socialLinks
  });

  return instructor;
};

export const updateInstructor = async (id, data) => {
  const instructor = await Instructor.findByIdAndUpdate(id, { $set: data }, { new: true });
  if (!instructor) {
    const error = new Error("Instructor record not found");
    error.statusCode = 404;
    throw error;
  }
  return instructor;
};

export const deactivateInstructor = async (id) => {
  const instructor = await Instructor.findByIdAndUpdate(id, { $set: { isActive: false } }, { new: true });
  if (!instructor) {
    const error = new Error("Instructor record not found");
    error.statusCode = 404;
    throw error;
  }
  return { message: "Instructor deactivated successfully" };
};

export const assignCourse = async (id, courseId) => {
  const instructor = await Instructor.findById(id);
  if (!instructor) {
    const error = new Error("Instructor record not found");
    error.statusCode = 404;
    throw error;
  }

  const course = await Course.findByIdAndUpdate(courseId, { $set: { instructor: id } }, { new: true });
  if (!course) {
    const error = new Error(ERROR_MESSAGES.COURSE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  return course;
};
