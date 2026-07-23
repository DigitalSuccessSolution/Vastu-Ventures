import mongoose from "mongoose";
import Course from "./course.model.js";
import Lesson from "./lesson.model.js";
import CourseCategory from "./courseCategory.model.js";
import Enrollment from "../enrollments/enrollment.model.js";
import Payment from "../payments/payment.model.js";
import slugify from "../../utils/slugify.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";

// Helper to resolve category and instructor ObjectIds from name or defaults
const resolveCourseDeps = async (data) => {
  const payload = { ...data };




  return payload;
};

// Course Category Services
export const getActiveCategories = async () => {
  return CourseCategory.find({ isActive: true });
};

export const getCourseCategoriesAdmin = async () => {
  return CourseCategory.find();
};

export const createCourseCategory = async (data) => {
  const slug = slugify(data.name);
  const existing = await CourseCategory.findOne({ slug });
  if (existing) {
    const error = new Error("Category with similar name already exists");
    error.statusCode = 409;
    throw error;
  }
  return CourseCategory.create({ ...data, slug });
};

export const updateCourseCategory = async (id, data) => {
  const updatePayload = { ...data };
  if (data.name) {
    updatePayload.slug = slugify(data.name);
  }
  const category = await CourseCategory.findByIdAndUpdate(id, { $set: updatePayload }, { new: true });
  if (!category) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return category;
};

export const deleteCourseCategory = async (id) => {
  const category = await CourseCategory.findById(id);
  if (!category) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  const linkedCoursesCount = await Course.countDocuments({ category: id });
  if (linkedCoursesCount > 0) {
    const error = new Error(`Cannot delete category "${category.name}" because it is currently assigned to ${linkedCoursesCount} course(s). Please delete or reassign those courses first.`);
    error.statusCode = 400;
    throw error;
  }

  await CourseCategory.findByIdAndDelete(id);
  return { message: "Course category deleted successfully" };
};

// Course Services
export const getPublishedCourses = async (categorySlug) => {
  const query = { status: "published", isActive: true };
  if (categorySlug) {
    const cat = await CourseCategory.findOne({ slug: categorySlug });
    if (cat) query.category = cat._id;
  }
  return Course.find(query)
    .populate("category")
    .select("-curriculum.lessons"); // Hide lesson details in catalog listing
};

export const getCourseBySlug = async (slug, user = null) => {
  let courseDoc = await Course.findOne({ slug, status: "published", isActive: true })
    .populate("category")
    .populate("curriculum.lessons");
  if (!courseDoc) {
    courseDoc = await Course.findOne({ slug })
      .populate("category")
      .populate("curriculum.lessons");
  }
  if (!courseDoc) {
    // Typo resolution fallback (e.g. vatu -> vastu, cource -> course)
    const cleanedSlug = slug.replace(/cource/gi, "course").replace(/vatu/gi, "vastu");
    courseDoc = await Course.findOne({ slug: cleanedSlug })
      .populate("category")
      .populate("curriculum.lessons");
  }
  if (!courseDoc) {
    const regexStr = slug.replace(/[-_]/g, ".*");
    courseDoc = await Course.findOne({ slug: { $regex: new RegExp(regexStr, "i") } })
      .populate("category")
      .populate("curriculum.lessons");
  }
  if (!courseDoc && mongoose.Types.ObjectId.isValid(slug)) {
    courseDoc = await Course.findById(slug)
      .populate("category")
      .populate("curriculum.lessons");
  }

  if (!courseDoc) {
    const error = new Error(ERROR_MESSAGES.COURSE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  const course = courseDoc.toObject();

  // Check enrollment or paid payment access
  let isPurchased = false;
  if (user) {
    if (user.role === "admin") {
      isPurchased = true;
    } else {
      const enrollment = await Enrollment.exists({ user: user._id, course: course._id });
      if (enrollment) {
        isPurchased = true;
      } else {
        const paidPayment = await Payment.exists({ user: user._id, course: course._id, status: "paid", orderType: "course" });
        if (paidPayment) isPurchased = true;
      }
    }
  }

  course.isPurchased = isPurchased;

  let globalLessonIndex = 0;
  if (course.curriculum && Array.isArray(course.curriculum)) {
    course.curriculum = course.curriculum.map((section) => {
      const sanitizedLessons = (section.lessons || []).map((lesson) => {
        const isFree = globalLessonIndex === 0; // First item is FREE preview
        const isLocked = !isPurchased && !isFree;
        globalLessonIndex++;

        if (isLocked) {
          // STRICT SECURITY: Strip actual video and PDF URLs for locked items
          return {
            _id: lesson._id,
            title: lesson.title,
            order: lesson.order,
            videoDuration: "",
            contentType: lesson.contentType,
            isLocked: true,
            isFree: false,
            videoUrl: "",
            fileUrl: "",
            fileName: "",
            resources: []
          };
        } else {
          return {
            ...lesson,
            videoDuration: "",
            isLocked: false,
            isFree: isFree
          };
        }
      });

      return {
        ...section,
        lessons: sanitizedLessons
      };
    });
  }

  return course;
};

export const getSecureLessonContent = async (userId, userRole, courseId, lessonId) => {
  const course = await Course.findById(courseId).populate("curriculum.lessons");
  if (!course) {
    const error = new Error(ERROR_MESSAGES.COURSE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  let targetLesson = null;
  let globalIndex = -1;
  let currentIndex = 0;

  if (course.curriculum && Array.isArray(course.curriculum)) {
    for (const section of course.curriculum) {
      for (const les of section.lessons || []) {
        if (les._id.toString() === lessonId.toString()) {
          targetLesson = les;
          globalIndex = currentIndex;
          break;
        }
        currentIndex++;
      }
      if (targetLesson) break;
    }
  }

  if (!targetLesson) {
    const error = new Error(ERROR_MESSAGES.LESSON_NOT_FOUND || "Lesson not found");
    error.statusCode = 404;
    throw error;
  }

  // Check authorization
  const isFreeItem = globalIndex === 0;
  if (!isFreeItem && userRole !== "admin") {
    const enrolled = await Enrollment.exists({ user: userId, course: courseId });
    if (!enrolled) {
      const error = new Error("Course purchase required to access this curriculum content");
      error.statusCode = 403;
      throw error;
    }
  }

  return targetLesson;
};

export const getAllCoursesAdmin = async () => {
  return Course.find().populate("category").populate("curriculum.lessons");
};

export const getCourseByIdAdmin = async (id) => {
  const course = await Course.findById(id)
    .populate("category")
    .populate("curriculum.lessons");
  if (!course) {
    const error = new Error(ERROR_MESSAGES.COURSE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return course;
};

export const createCourse = async (data) => {
  const resolvedData = await resolveCourseDeps(data);
  const slug = resolvedData.slug && resolvedData.slug.trim() !== "" ? slugify(resolvedData.slug) : slugify(resolvedData.title);
  const existing = await Course.findOne({ slug });
  if (existing) {
    const error = new Error("Course with similar title already exists");
    error.statusCode = 409;
    throw error;
  }

  const curriculumData = resolvedData.curriculum || [];
  delete resolvedData.curriculum;

  const course = await Course.create({ ...resolvedData, slug });

  if (curriculumData.length > 0) {
    let totalLessons = 0;
    for (const section of curriculumData) {
      const lessonIds = [];
      for (const les of section.lessons || []) {
        const newLesson = await Lesson.create({
          course: course._id,
          sectionTitle: section.sectionTitle,
          title: les.title || "Untitled Lesson",
          videoDuration: les.videoDuration || les.duration || "",
          videoUrl: les.youtubeUrl || les.videoUrl || "",
          fileUrl: les.fileUrl || les.youtubeUrl || "",
          fileName: les.fileName || "",
          contentType: les.contentType || "youtube"
        });
        lessonIds.push(newLesson._id);
        totalLessons++;
      }
      course.curriculum.push({
        sectionTitle: section.sectionTitle,
        lessons: lessonIds
      });
    }
    if (data.totalLessons === undefined || data.totalLessons === null) {
      course.totalLessons = totalLessons;
    }
    await course.save();
  }

  return course;
};

export const updateCourse = async (id, data) => {
  const resolvedData = await resolveCourseDeps(data);
  const updatePayload = { ...resolvedData };
  if (resolvedData.slug && resolvedData.slug.trim() !== "") {
    updatePayload.slug = slugify(resolvedData.slug);
  } else if (resolvedData.title) {
    updatePayload.slug = slugify(resolvedData.title);
  }

  const curriculumData = updatePayload.curriculum;
  delete updatePayload.curriculum;

  let course = await Course.findByIdAndUpdate(id, { $set: updatePayload }, { new: true, runValidators: true });
  if (!course) {
    const error = new Error(ERROR_MESSAGES.COURSE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (curriculumData) {
    await Lesson.deleteMany({ course: course._id });
    course.curriculum = [];
    let totalLessons = 0;
    for (const section of curriculumData) {
      const lessonIds = [];
      for (const les of section.lessons || []) {
        const newLesson = await Lesson.create({
          course: course._id,
          sectionTitle: section.sectionTitle,
          title: les.title || "Untitled Lesson",
          videoDuration: les.videoDuration || les.duration || "",
          videoUrl: les.youtubeUrl || les.videoUrl || "",
          fileUrl: les.fileUrl || les.youtubeUrl || "",
          fileName: les.fileName || "",
          contentType: les.contentType || "youtube"
        });
        lessonIds.push(newLesson._id);
        totalLessons++;
      }
      course.curriculum.push({
        sectionTitle: section.sectionTitle,
        lessons: lessonIds
      });
    }
    if (data.totalLessons === undefined || data.totalLessons === null) {
      course.totalLessons = totalLessons;
    }
    await course.save();
  }

  return course;
};

export const deleteCourse = async (id) => {
  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    const error = new Error(ERROR_MESSAGES.COURSE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  // Delete related lessons
  await Lesson.deleteMany({ course: id });
  return { message: "Course and related lessons deleted successfully" };
};

// Lesson & Curriculum Services
export const addLesson = async (courseId, lessonData) => {
  const course = await Course.findById(courseId);
  if (!course) {
    const error = new Error(ERROR_MESSAGES.COURSE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  const lesson = await Lesson.create({ ...lessonData, course: courseId });

  // Update curriculum hierarchy
  const sectionIndex = course.curriculum.findIndex((s) => s.sectionTitle === lessonData.sectionTitle);
  if (sectionIndex > -1) {
    course.curriculum[sectionIndex].lessons.push(lesson._id);
  } else {
    course.curriculum.push({
      sectionTitle: lessonData.sectionTitle,
      order: course.curriculum.length + 1,
      lessons: [lesson._id]
    });
  }

  course.totalLessons += 1;
  await course.save();

  return lesson;
};

export const updateLesson = async (courseId, lessonId, lessonData) => {
  const lesson = await Lesson.findOneAndUpdate(
    { _id: lessonId, course: courseId },
    { $set: lessonData },
    { new: true }
  );
  if (!lesson) {
    const error = new Error(ERROR_MESSAGES.LESSON_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return lesson;
};

export const deleteLesson = async (courseId, lessonId) => {
  const lesson = await Lesson.findOneAndDelete({ _id: lessonId, course: courseId });
  if (!lesson) {
    const error = new Error(ERROR_MESSAGES.LESSON_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  const course = await Course.findById(courseId);
  if (course) {
    // Remove from curriculum
    course.curriculum.forEach((section) => {
      section.lessons = section.lessons.filter((id) => id.toString() !== lessonId);
    });
    // Remove empty sections
    course.curriculum = course.curriculum.filter((section) => section.lessons.length > 0);
    course.totalLessons = Math.max(course.totalLessons - 1, 0);
    await course.save();
  }

  return { message: "Lesson deleted successfully" };
};

export const reorderCurriculum = async (courseId, curriculumData) => {
  const course = await Course.findById(courseId);
  if (!course) {
    const error = new Error(ERROR_MESSAGES.COURSE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  course.curriculum = curriculumData.curriculum;
  await course.save();
  return course.curriculum;
};
