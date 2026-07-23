import mongoose from "mongoose";
import dotenv from "dotenv";
import Enrollment from "../modules/enrollments/enrollment.model.js";
import User from "../modules/users/user.model.js";

dotenv.config();

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const enrollments = await Enrollment.find().populate("user").populate("course");
    console.log("TOTAL ENROLLMENTS:", enrollments.length);
    enrollments.forEach(e => {
      console.log(`User: ${e.user?.email} (${e.user?.role}) | Course: ${e.course?.slug} | EnrolledAt: ${e.enrolledAt}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

check();
