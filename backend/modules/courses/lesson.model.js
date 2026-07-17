import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    sectionTitle: { type: String, required: [true, "Section title is required"] },
    title: { type: String, required: [true, "Lesson title is required"], trim: true },
    description: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    videoDuration: { type: String, default: "" },
    resources: [
      {
        name: { type: String },
        fileUrl: { type: String },
        publicId: { type: String },
      },
    ],
    fileUrl: { type: String, default: "" },
    fileName: { type: String, default: "" },
    contentType: { type: String, enum: ["youtube", "pdf"], default: "youtube" },
    order: { type: Number, required: true, default: 0 },
    isPreview: { type: Boolean, default: false },
  },
  { timestamps: true }
);

lessonSchema.index({ course: 1, order: 1 });

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;
