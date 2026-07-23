import Enrollment from "./enrollment.model.js";
import CourseProgress from "./courseProgress.model.js";
import Course from "../courses/course.model.js";
import Lesson from "../courses/lesson.model.js";
import Certificate from "../certificates/certificate.model.js";
import User from "../users/user.model.js";
import Payment from "../payments/payment.model.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";
import generateCertificateId from "../../utils/generateCertificateId.js";
import { generateCertificatePDF } from "../../services/pdfService.js";
import { uploadToCloudinary } from "../../services/cloudinaryService.js";
import { sendCertificateEmail } from "../../services/emailService.js";
import Notification from "../notifications/notification.model.js";

export const getEnrolledCourseData = async (userId, courseId) => {
  let enrollment = await Enrollment.findOne({ user: userId, course: courseId }).populate("course");

  if (!enrollment) {
    const paidPayment = await Payment.findOne({ user: userId, course: courseId, status: "paid", orderType: "course" });
    if (paidPayment) {
      enrollment = await Enrollment.create({
        user: userId,
        course: courseId,
        payment: paidPayment._id,
        enrolledAt: paidPayment.paidAt || paidPayment.createdAt || new Date()
      });
      enrollment = await Enrollment.findById(enrollment._id).populate("course");
    }
  }

  if (!enrollment) {
    const error = new Error(ERROR_MESSAGES.NOT_ENROLLED);
    error.statusCode = 403;
    throw error;
  }

  // Get progress records
  const progressRecords = await CourseProgress.find({ user: userId, course: courseId });

  return { enrollment, progress: progressRecords };
};

export const getLessonContent = async (userId, courseId, lessonId) => {
  const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
  if (!enrollment) {
    const error = new Error(ERROR_MESSAGES.NOT_ENROLLED);
    error.statusCode = 403;
    throw error;
  }

  const lesson = await Lesson.findOne({ _id: lessonId, course: courseId });
  if (!lesson) {
    const error = new Error(ERROR_MESSAGES.LESSON_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  // Update last accessed lesson pointer
  enrollment.lastAccessedLesson = lessonId;
  await enrollment.save();

  return lesson;
};

export const updateWatchProgress = async (userId, courseId, lessonId, watchPercentage) => {
  const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
  if (!enrollment) {
    const error = new Error(ERROR_MESSAGES.NOT_ENROLLED);
    error.statusCode = 403;
    throw error;
  }

  const progress = await CourseProgress.findOneAndUpdate(
    { user: userId, course: courseId, lesson: lessonId },
    {
      $set: {
        watchPercentage,
        lastWatchedAt: new Date()
      }
    },
    { new: true, upsert: true }
  );

  return progress;
};

export const markLessonCompleted = async (userId, courseId, lessonId) => {
  let enrollment = await Enrollment.findOne({ user: userId, course: courseId });
  if (!enrollment) {
    const paidPayment = await Payment.findOne({ user: userId, course: courseId, status: "paid", orderType: "course" });
    if (paidPayment) {
      enrollment = await Enrollment.create({
        user: userId,
        course: courseId,
        payment: paidPayment._id,
        enrolledAt: paidPayment.paidAt || paidPayment.createdAt || new Date()
      });
    }
  }

  if (!enrollment) {
    const error = new Error(ERROR_MESSAGES.NOT_ENROLLED);
    error.statusCode = 403;
    throw error;
  }

  await CourseProgress.findOneAndUpdate(
    { user: userId, course: courseId, lesson: lessonId },
    {
      $set: {
        isCompleted: true,
        watchPercentage: 100,
        lastWatchedAt: new Date()
      }
    },
    { upsert: true }
  );

  // Recalculate enrollment completion percentage accurately from course.curriculum
  const courseDoc = await Course.findById(courseId);
  let totalLessons = 0;
  if (courseDoc && Array.isArray(courseDoc.curriculum)) {
    totalLessons = courseDoc.curriculum.reduce(
      (acc, sec) => acc + (sec.lessons || []).length,
      0
    );
  }

  const completedLessons = await CourseProgress.countDocuments({
    user: userId,
    course: courseId,
    isCompleted: true
  });

  const completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  enrollment.completionPercentage = completionPercentage;

  if (completionPercentage === 100 && !enrollment.isCompleted) {
    enrollment.isCompleted = true;
    enrollment.completedAt = new Date();
    await enrollment.save();

    // Auto-generate certificate
    await issueCertificate(userId, courseId, enrollment._id);
  } else {
    await enrollment.save();
  }

  return { completionPercentage, isCompleted: enrollment.isCompleted };
};

export const getContinueLearning = async (userId, courseId) => {
  const enrollment = await Enrollment.findOne({ user: userId, course: courseId })
    .populate("lastAccessedLesson");
  if (!enrollment) {
    const error = new Error(ERROR_MESSAGES.NOT_ENROLLED);
    error.statusCode = 403;
    throw error;
  }
  return enrollment.lastAccessedLesson || null;
};

// Internal Helper: Issue certificate and notify student
const issueCertificate = async (userId, courseId, enrollmentId) => {
  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    const certificateId = generateCertificateId();

    // Generate PDF buffer
    const pdfBuffer = await generateCertificatePDF({
      studentName: `${user.firstName} ${user.lastName}`,
      courseName: course.title,
      certificateId,
      issuedAt: new Date().toDateString()
    });

    // Upload PDF to Cloudinary raw folder
    const uploadResult = await uploadToCloudinary(pdfBuffer, "vastuventures/certificates", "raw");

    // Create Certificate record
    await Certificate.create({
      certificateId,
      user: userId,
      course: courseId,
      enrollment: enrollmentId,
      pdfUrl: uploadResult.url,
      pdfPublicId: uploadResult.publicId
    });

    // Mark enrollment as certificate issued
    await Enrollment.findByIdAndUpdate(enrollmentId, { $set: { certificateIssued: true } });

    // Send notifications/emails
    sendCertificateEmail(user.email, `${user.firstName} ${user.lastName}`, course.title, certificateId);
    await Notification.create({
      user: userId,
      type: "certificate_issued",
      title: "Course Certificate Issued!",
      message: `Congratulations! Your certificate for ${course.title} is now available for download.`,
      link: "/dashboard/courses"
    });

    console.log(`✅ Certificate issued: ${certificateId}`);
  } catch (error) {
    console.error(`❌ Auto certificate generation failed: ${error.message}`);
  }
};
