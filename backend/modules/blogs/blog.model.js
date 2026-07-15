import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Blog title is required"], trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: [true, "Content is required"] },
    shortDescription: { type: String, default: "" },
    featuredImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "BlogCategory", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    readTime: { type: String, default: "" },
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      keywords: [{ type: String }],
    },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);


blogSchema.index({ status: 1, publishedAt: -1 });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
