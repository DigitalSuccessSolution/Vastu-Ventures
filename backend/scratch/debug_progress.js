import mongoose from "mongoose";
import dotenv from "dotenv";
import Enrollment from "../modules/enrollments/enrollment.model.js";
import CourseProgress from "../modules/enrollments/courseProgress.model.js";
import Course from "../modules/courses/course.model.js";

dotenv.config();

const debug = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("=== DEBUGGING ENROLLMENTS & COURSE PROGRESS ===");
    
    const enrollments = await Enrollment.find().populate("user").populate("course");
    console.log("Enrollments count:", enrollments.length);
    enrollments.forEach((e) => {
      console.log(`Enrollment ID: ${e._id} | User: ${e.user?.email || e.user} | Course: "${e.course?.title}" | completionPercentage: ${e.completionPercentage} | isCompleted: ${e.isCompleted}`);
    });

    const progressList = await CourseProgress.find().populate("user").populate("course");
    console.log("\nCourseProgress records count:", progressList.length);
    progressList.forEach((p, idx) => {
      console.log(`[${idx+1}] User: ${p.user?.email || p.user} | Course: "${p.course?.title || p.course}" | Lesson ID: ${p.lesson} | isCompleted: ${p.isCompleted} | watchPercentage: ${p.watchPercentage}`);
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

debug();
