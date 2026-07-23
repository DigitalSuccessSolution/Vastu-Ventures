import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../modules/courses/course.model.js";

dotenv.config();

const listCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const courses = await Course.find();
    console.log("=== ALL COURSES IN DATABASE ===");
    courses.forEach((c, idx) => {
      console.log(`[${idx+1}] Title: "${c.title}" | Slug: "${c.slug}" | Status: "${c.status}" | isActive: ${c.isActive}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

listCourses();
