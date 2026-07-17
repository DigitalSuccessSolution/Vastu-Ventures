import mongoose from "mongoose";
import env from "./env.js";
import User from "../modules/users/user.model.js";
import Course from "../modules/courses/course.model.js";
import CourseCategory from "../modules/courses/courseCategory.model.js";
import Instructor from "../modules/instructors/instructor.model.js";
import Lesson from "../modules/courses/lesson.model.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // 1. Seed default admin user if none exists
    const adminExists = await User.findOne({ email: "admin@vastuventures.com" });
    if (!adminExists) {
      await User.create({
        firstName: "Root",
        lastName: "Admin",
        email: "admin@vastuventures.com",
        password: "adminpassword", // Will be hashed by userSchema.pre('save')
        role: "admin",
        isEmailVerified: true
      });
      console.log("👤 Default admin user seeded: admin@vastuventures.com / adminpassword");
    }

    // 2. Seed default CourseCategory
    let foundationalCat = await CourseCategory.findOne({ slug: "foundational" });
    if (!foundationalCat) {
      foundationalCat = await CourseCategory.create({
        name: "Foundational",
        slug: "foundational",
        description: "Foundational Vastu courses"
      });
      console.log("📂 Seeding foundational course category");
    }
    let professionalCat = await CourseCategory.findOne({ slug: "professional" });
    if (!professionalCat) {
      professionalCat = await CourseCategory.create({
        name: "Professional",
        slug: "professional",
        description: "Professional Vastu training"
      });
      console.log("📂 Seeding professional course category");
    }

    // 3. Seed default Instructor
    let instructorUser = await User.findOne({ email: "instructor@vastuventures.com" });
    if (!instructorUser) {
      instructorUser = await User.create({
        firstName: "Raghavendra",
        lastName: "Acharya",
        email: "instructor@vastuventures.com",
        password: "instructorpassword",
        role: "instructor",
        isEmailVerified: true
      });
      console.log("👤 Default instructor user seeded: instructor@vastuventures.com / instructorpassword");
    }
    let defaultInstructor = await Instructor.findOne({ user: instructorUser._id });
    if (!defaultInstructor) {
      defaultInstructor = await Instructor.create({
        user: instructorUser._id,
        displayName: "Acharya Raghavendra",
        bio: "With over 22 years of practice, Acharya Raghavendra has consulted for 1,500+ homes and businesses worldwide.",
        specializations: ["Residential Vastu", "Vedic Science", "Energy Balancing"],
        avatar: { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200", publicId: "" }
      });
      console.log("👤 Default instructor profile created");
    }
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
