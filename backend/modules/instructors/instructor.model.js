import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    displayName: { type: String, required: [true, "Display name is required"], trim: true },
    bio: { type: String, default: "" },
    specializations: [{ type: String }],
    avatar: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    socialLinks: {
      website: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;
