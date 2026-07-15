import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, "Question is required"] },
    answer: { type: String, required: [true, "Answer is required"] },
    category: {
      type: String,
      enum: ["general", "consultations", "education", "payments"],
      required: true,
    },
    relatedService: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    relatedCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

faqSchema.index({ category: 1, order: 1 });

const FAQ = mongoose.model("FAQ", faqSchema);
export default FAQ;
