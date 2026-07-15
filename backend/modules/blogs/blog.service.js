import Blog from "./blog.model.js";
import BlogCategory from "./blogCategory.model.js";
import slugify from "../../utils/slugify.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";

// Blog Categories Services
export const getActiveCategories = async () => {
  return BlogCategory.find({ isActive: true });
};

export const getBlogCategoriesAdmin = async () => {
  return BlogCategory.find();
};

export const createBlogCategory = async (data) => {
  const slug = slugify(data.name);
  const existing = await BlogCategory.findOne({ slug });
  if (existing) {
    const error = new Error("Category with similar name already exists");
    error.statusCode = 409;
    throw error;
  }
  return BlogCategory.create({ ...data, slug });
};

export const updateBlogCategory = async (id, data) => {
  const updatePayload = { ...data };
  if (data.name) {
    updatePayload.slug = slugify(data.name);
  }
  const category = await BlogCategory.findByIdAndUpdate(id, { $set: updatePayload }, { new: true });
  if (!category) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return category;
};

export const deleteBlogCategory = async (id) => {
  const linkedBlogsCount = await Blog.countDocuments({ category: id });
  if (linkedBlogsCount > 0) {
    const error = new Error("Cannot delete category containing linked blogs.");
    error.statusCode = 400;
    throw error;
  }
  const category = await BlogCategory.findByIdAndDelete(id);
  if (!category) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return { message: "Blog category deleted successfully" };
};

// Blog Posts Services
export const getPublishedBlogs = async (categorySlug) => {
  const query = { status: "published" };
  if (categorySlug) {
    const cat = await BlogCategory.findOne({ slug: categorySlug });
    if (cat) query.category = cat._id;
  }
  return Blog.find(query).populate("category").populate("author", "firstName lastName").sort({ publishedAt: -1 });
};

export const getBlogBySlug = async (slug) => {
  const blog = await Blog.findOne({ slug, status: "published" })
    .populate("category")
    .populate("author", "firstName lastName");
  if (!blog) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return blog;
};

export const getRelatedBlogs = async (slug) => {
  const currentBlog = await Blog.findOne({ slug });
  if (!currentBlog) return [];

  return Blog.find({
    category: currentBlog.category,
    slug: { $ne: slug },
    status: "published"
  })
    .limit(3)
    .populate("author", "firstName lastName");
};

export const getAllBlogsAdmin = async () => {
  return Blog.find().populate("category").populate("author", "firstName lastName");
};

export const getBlogByIdAdmin = async (id) => {
  const blog = await Blog.findById(id).populate("category");
  if (!blog) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return blog;
};

export const createBlog = async (userId, data) => {
  const slug = slugify(data.title);
  const existing = await Blog.findOne({ slug });
  if (existing) {
    const error = new Error("Blog with similar title already exists");
    error.statusCode = 409;
    throw error;
  }

  const publishedAt = data.status === "published" ? new Date() : undefined;

  return Blog.create({
    ...data,
    slug,
    author: userId,
    publishedAt
  });
};

export const updateBlog = async (id, data) => {
  const updatePayload = { ...data };
  if (data.title) {
    updatePayload.slug = slugify(data.title);
  }
  if (data.status === "published") {
    updatePayload.publishedAt = new Date();
  }

  const blog = await Blog.findByIdAndUpdate(id, { $set: updatePayload }, { new: true });
  if (!blog) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return blog;
};

export const deleteBlog = async (id) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return { message: "Blog post deleted successfully" };
};
