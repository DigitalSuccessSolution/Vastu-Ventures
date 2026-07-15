import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: true },
    enrolledAt: { type: Date, default: Date.now },
    lastAccessedLesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
    completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date },
    certificateIssued: { type: Boolean, default: false },
  },
  { timestamps: true }
);

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });
enrollmentSchema.index({ user: 1 });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
