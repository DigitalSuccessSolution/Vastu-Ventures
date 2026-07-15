import Review from "./review.model.js";
import Course from "../courses/course.model.js";
import Service from "../services/service.model.js";
import Enrollment from "../enrollments/enrollment.model.js";
import Consultation from "../consultations/consultation.model.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";

export const submitReview = async (userId, data) => {
  const { reviewableType, courseId, serviceId, rating, title, comment } = data;

  if (reviewableType === "course") {
    if (!courseId) throw new Error("Course ID is required for course reviews");
    // Verify enrollment
    const isEnrolled = await Enrollment.findOne({ user: userId, course: courseId });
    if (!isEnrolled) {
      const error = new Error("You must be enrolled in the course to write a review");
      error.statusCode = 403;
      throw error;
    }

    // Check duplicate review
    const duplicate = await Review.findOne({ user: userId, course: courseId });
    if (duplicate) {
      const error = new Error(ERROR_MESSAGES.ALREADY_REVIEWED);
      error.statusCode = 400;
      throw error;
    }
  } else if (reviewableType === "service") {
    if (!serviceId) throw new Error("Service ID is required for service reviews");
    // Verify completed consultation
    const isConsulted = await Consultation.findOne({ user: userId, service: serviceId, status: "completed" });
    if (!isConsulted) {
      const error = new Error("You must have a completed consultation for this service to write a review");
      error.statusCode = 403;
      throw error;
    }

    // Check duplicate review
    const duplicate = await Review.findOne({ user: userId, service: serviceId });
    if (duplicate) {
      const error = new Error(ERROR_MESSAGES.ALREADY_REVIEWED);
      error.statusCode = 400;
      throw error;
    }
  }

  const review = await Review.create({
    user: userId,
    reviewableType,
    course: courseId || undefined,
    service: serviceId || undefined,
    rating,
    title,
    comment,
    isApproved: false // Requires admin approval
  });

  return review;
};

export const getMyReviews = async (userId) => {
  return Review.find({ user: userId }).populate("course").populate("service");
};

export const getAllReviewsAdmin = async () => {
  return Review.find().populate("user").populate("course").populate("service").sort({ createdAt: -1 });
};

export const approveReview = async (id) => {
  const review = await Review.findByIdAndUpdate(id, { $set: { isApproved: true } }, { new: true });
  if (!review) {
    const error = new Error(ERROR_MESSAGES.REVIEW_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  // Recalculate average rating of Course
  if (review.reviewableType === "course" && review.course) {
    await recalculateCourseRating(review.course);
  }

  return review;
};

export const rejectReview = async (id) => {
  const review = await Review.findByIdAndUpdate(id, { $set: { isApproved: false } }, { new: true });
  if (!review) {
    const error = new Error(ERROR_MESSAGES.REVIEW_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  
  if (review.reviewableType === "course" && review.course) {
    await recalculateCourseRating(review.course);
  }

  return review;
};

export const deleteReview = async (id) => {
  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    const error = new Error(ERROR_MESSAGES.REVIEW_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (review.reviewableType === "course" && review.course) {
    await recalculateCourseRating(review.course);
  }

  return { message: "Review deleted successfully" };
};

// Rating aggregation helper
const recalculateCourseRating = async (courseId) => {
  const stats = await Review.aggregate([
    { $match: { course: courseId, isApproved: true } },
    {
      $group: {
        _id: "$course",
        averageRating: { $avg: "$rating" },
        reviewsCount: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await Course.findByIdAndUpdate(courseId, {
      $set: {
        averageRating: Math.round(stats[0].averageRating * 10) / 10,
        reviewsCount: stats[0].reviewsCount
      }
    });
  } else {
    await Course.findByIdAndUpdate(courseId, {
      $set: {
        averageRating: 0,
        reviewsCount: 0
      }
    });
  }
};
