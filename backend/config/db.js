import mongoose from "mongoose";
import env from "./env.js";
import User from "../modules/users/user.model.js";


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



  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
