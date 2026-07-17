import mongoose from "mongoose";
import env from "../config/env.js";
import Course from "../modules/courses/course.model.js";
import Lesson from "../modules/courses/lesson.model.js";

async function check() {
  await mongoose.connect(env.MONGODB_URI);
  console.log("Connected to DB");
  const courses = await Course.find().populate("curriculum.lessons");
  console.log("Courses:", JSON.stringify(courses, null, 2));
  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});
