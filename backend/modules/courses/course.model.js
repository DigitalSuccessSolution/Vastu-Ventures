import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Course title is required"], trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    thumbnail: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    description: { type: String, required: [true, "Description is required"] },
    shortDescription: { type: String, default: "" },
    price: { type: Number, required: [true, "Price is required"], min: 0 },
    originalPrice: { type: Number, default: 0 },
    duration: { type: String, default: "" },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "CourseCategory", required: true },
    curriculum: [
      {
        sectionTitle: { type: String },
        order: { type: Number },
        lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
      },
    ],
    benefits: [{ type: String }],
    requirements: [{ type: String }],
    totalLessons: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0 },
    enrollmentCount: { type: Number, default: 0 },
    certificateImageUrl: { type: String, default: "" },
    demoVideoUrl: { type: String, default: "" },
    demoVideos: [
      {
        title: { type: String, default: "" },
        videoUrl: { type: String, default: "" }
      }
    ],
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      keywords: [{ type: String }],
    },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);


courseSchema.index({ category: 1 });
courseSchema.index({ status: 1 });

const Course = mongoose.model("Course", courseSchema);
export default Course;
