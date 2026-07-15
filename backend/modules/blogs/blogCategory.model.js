import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Category name is required"], trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);



const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);
export default BlogCategory;
