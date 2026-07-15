import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Service title is required"], trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "VastuCategory", required: true },
    icon: { type: String, default: "" },
    description: { type: String, required: [true, "Description is required"] },
    longDescription: { type: String, default: "" },
    price: { type: Number, required: [true, "Price is required"], min: 0 },
    images: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],
    benefits: [{ type: String }],
    process: [
      {
        step: { type: Number },
        title: { type: String },
        description: { type: String },
      },
    ],
    onlineAvailable: { type: Boolean, default: true },
    offlineAvailable: { type: Boolean, default: false },
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      keywords: [{ type: String }],
    },
    faqs: [{ type: mongoose.Schema.Types.ObjectId, ref: "FAQ" }],
    relatedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);


serviceSchema.index({ category: 1 });

const Service = mongoose.model("Service", serviceSchema);
export default Service;
