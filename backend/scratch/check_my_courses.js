import mongoose from "mongoose";
import dotenv from "dotenv";
import Enrollment from "../modules/enrollments/enrollment.model.js";
import User from "../modules/users/user.model.js";
import Course from "../modules/courses/course.model.js";

dotenv.config();

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const enrollments = await Enrollment.find().populate("user").populate("course");
    console.log("=== ENROLLMENTS IN DATABASE ===");
    console.log("Count:", enrollments.length);
    enrollments.forEach((e, idx) => {
      console.log(`[${idx+1}] User ID: ${e.user?._id || e.user} | User Email: ${e.user?.email} | Course ID: ${e.course?._id || e.course} | Course Title: "${e.course?.title}" | Slug: "${e.course?.slug}"`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

check();
