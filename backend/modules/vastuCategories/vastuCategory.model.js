import mongoose from "mongoose";

const vastuCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Category name is required"], trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);



const VastuCategory = mongoose.model("VastuCategory", vastuCategorySchema);
export default VastuCategory;
