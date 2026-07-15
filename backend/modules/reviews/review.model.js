import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reviewableType: { type: String, enum: ["course", "service"], required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    rating: { type: Number, required: [true, "Rating is required"], min: 1, max: 5 },
    title: { type: String, default: "", trim: true },
    comment: { type: String, required: [true, "Comment is required"] },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

reviewSchema.index({ user: 1, course: 1 });
reviewSchema.index({ isApproved: 1 });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
