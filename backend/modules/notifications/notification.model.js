import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["booking_update", "payment_success", "certificate_issued", "course_update", "general"],
      required: true,
    },
    title: { type: String, required: [true, "Title is required"] },
    message: { type: String, required: [true, "Message is required"] },
    link: { type: String, default: "" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
