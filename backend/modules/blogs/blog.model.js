import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Blog title is required"], trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: [true, "Content is required"] },
    shortDescription: { type: String, default: "" },
    image: { type: String, default: "" },
    category: { type: String, default: "General" },
    author: { type: String, default: "Acharya Raghavendra" },
    readTime: { type: String, default: "1 min read" },
    date: { type: String, default: "" },
    status: { type: String, enum: ["Draft", "Published", "Scheduled"], default: "Draft" },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
