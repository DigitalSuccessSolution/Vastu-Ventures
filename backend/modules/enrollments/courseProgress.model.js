import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
    isCompleted: { type: Boolean, default: false },
    watchPercentage: { type: Number, default: 0, min: 0, max: 100 },
    lastWatchedAt: { type: Date },
  },
  { timestamps: true }
);

courseProgressSchema.index({ user: 1, course: 1, lesson: 1 }, { unique: true });

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
export default CourseProgress;
