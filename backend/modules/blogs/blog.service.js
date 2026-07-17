import Blog from "./blog.model.js";
import BlogCategory from "./blogCategory.model.js";

export const getPublishedBlogs = async () => {
  const now = new Date();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  
  return blogs.filter((blog) => {
    if (blog.status === "Draft") return false;
    
    // Future publication date is not visible on public side
    if (blog.date) {
      const publishDate = new Date(blog.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      publishDate.setHours(0, 0, 0, 0);
      if (publishDate > today) {
        return false;
      }
    }

    if (blog.status === "Scheduled") {
      const publishDate = new Date(blog.date);
      return now >= publishDate;
    }
    return true;
  });
};

export const getBlogBySlug = async (slug) => {
  const blog = await Blog.findOne({ slug });
  if (!blog) {
    const error = new Error("Blog not found");
    error.statusCode = 404;
    throw error;
  }

  // Validate public access restrictions
  if (blog.status === "Draft") {
    const error = new Error("Blog not found");
    error.statusCode = 404;
    throw error;
  }

  if (blog.date) {
    const publishDate = new Date(blog.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    publishDate.setHours(0, 0, 0, 0);
    if (publishDate > today) {
      const error = new Error("Blog not found");
      error.statusCode = 404;
      throw error;
    }
  }

  return blog;
};

export const getRelatedBlogs = async (slug) => {
  const currentBlog = await Blog.findOne({ slug });
  if (!currentBlog) return [];

  const allBlogs = await Blog.find({ slug: { $ne: slug } });
  const now = new Date();

  return allBlogs
    .filter((blog) => {
      if (blog.status === "Draft") return false;
      
      // Future publication date is not visible on public side
      if (blog.date) {
        const publishDate = new Date(blog.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        publishDate.setHours(0, 0, 0, 0);
        if (publishDate > today) {
          return false;
        }
      }

      if (blog.status === "Scheduled") {
        const publishDate = new Date(blog.date);
        return now >= publishDate;
      }
      return blog.category === currentBlog.category;
    })
    .slice(0, 2);
};

export const getAllBlogsAdmin = async () => {
  return Blog.find().sort({ createdAt: -1 });
};

export const getBlogByIdAdmin = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    const error = new Error("Blog not found");
    error.statusCode = 404;
    throw error;
  }
  return blog;
};

export const createBlog = async (data) => {
  let slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  
  const existing = await Blog.findOne({ slug });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  let status = data.status;
  if (data.date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pubDate = new Date(data.date);
    pubDate.setHours(0, 0, 0, 0);
    if (pubDate > today && status === "Published") {
      status = "Scheduled";
    }
  }

  return Blog.create({
    ...data,
    slug,
    status
  });
};

export const updateBlog = async (id, data) => {
  let status = data.status;
  if (data.date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pubDate = new Date(data.date);
    pubDate.setHours(0, 0, 0, 0);
    if (pubDate > today && status === "Published") {
      status = "Scheduled";
    }
  }

  const payload = {
    ...data
  };
  if (status) {
    payload.status = status;
  }

  const blog = await Blog.findByIdAndUpdate(id, { $set: payload }, { new: true });
  if (!blog) {
    const error = new Error("Blog not found");
    error.statusCode = 404;
    throw error;
  }
  return blog;
};

export const deleteBlog = async (id) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    const error = new Error("Blog not found");
    error.statusCode = 404;
    throw error;
  }
  return { message: "Blog post deleted successfully" };
};

// Categories services
export const getActiveCategories = async () => {
  return BlogCategory.find({ isActive: true }).sort({ name: 1 });
};

export const getBlogCategoriesAdmin = async () => {
  return BlogCategory.find().sort({ name: 1 });
};

export const createBlogCategory = async (data) => {
  let slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  
  const existing = await BlogCategory.findOne({ slug });
  if (existing) {
    const error = new Error("Category already exists");
    error.statusCode = 400;
    throw error;
  }

  return BlogCategory.create({
    ...data,
    slug
  });
};

export const updateBlogCategory = async (id, data) => {
  const category = await BlogCategory.findByIdAndUpdate(id, { $set: data }, { new: true });
  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }
  return category;
};

export const deleteBlogCategory = async (id) => {
  const category = await BlogCategory.findById(id);
  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  // Enforce reference integrity: category cannot be deleted if active blogs exist inside it
  const associatedBlogsCount = await Blog.countDocuments({ category: category.name });
  if (associatedBlogsCount > 0) {
    const error = new Error(`Cannot delete category "${category.name}" because it is currently assigned to ${associatedBlogsCount} blog post(s). Please delete or reassign those blogs first.`);
    error.statusCode = 400;
    throw error;
  }

  await BlogCategory.findByIdAndDelete(id);
  return { message: "Category deleted successfully" };
};
