import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    consultationType: { type: String, enum: ["online", "offline"], required: true },
    preferredDate: { type: Date, required: [true, "Preferred date is required"] },
    preferredTimeSlot: { type: String, required: [true, "Time slot is required"] },
    name: { type: String, required: [true, "Contact name is required"], trim: true },
    email: { type: String, required: [true, "Contact email is required"], trim: true },
    phone: { type: String, required: [true, "Contact phone is required"], trim: true },
    address: { type: String, default: "" },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "rescheduled", "completed"],
      default: "pending",
    },
    adminNotes: { type: String, default: "" },
    rescheduledDate: { type: Date },
    rescheduledTimeSlot: { type: String },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

consultationSchema.index({ user: 1 });
consultationSchema.index({ status: 1 });
consultationSchema.index({ preferredDate: 1, preferredTimeSlot: 1 });

const Consultation = mongoose.model("Consultation", consultationSchema);
export default Consultation;
