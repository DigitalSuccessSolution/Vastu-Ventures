import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    certificateId: { type: String, required: true, unique: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref: "Enrollment", required: true },
    issuedAt: { type: Date, default: Date.now },
    pdfUrl: { type: String, required: true },
    pdfPublicId: { type: String, required: true },
  },
  { timestamps: true }
);


certificateSchema.index({ user: 1 });

const Certificate = mongoose.model("Certificate", certificateSchema);
export default Certificate;
