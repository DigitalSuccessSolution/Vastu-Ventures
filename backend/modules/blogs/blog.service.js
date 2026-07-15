import Blog from "./blog.model.js";

// Helper to seed initial blogs by slug check
const seedInitialBlogs = async () => {
  const initial = [
    {
      title: 'Top 5 Main Entrance Vastu Mistakes You Must Fix Right Away',
      slug: 'top-5-main-entrance-vastu-mistakes',
      date: 'July 10, 2026',
      author: 'Acharya Raghavendra',
      category: 'Residential Vastu',
      shortDescription: 'The entrance (Maha Dwaar) determines what energies flow into your home. Learn how to identify and resolve entrance blocks.',
      content: 'In traditional Vastu, the main entrance is considered the mouth of the house. If the entrance is cluttered, poorly lit, or falls into a negative zone, it blocks wealth and harmony from entering. In this article, we cover why you must keep your main door larger than other doors, avoid shadows over the entrance, avoid mirrors reflecting the entrance, clean rusty locks, and place brass or copper elements to shield negative energies.',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800',
      readTime: '5 min read',
      status: 'Published'
    },
    {
      title: 'How to Place Boilers and Furnaces in Commercial Offices',
      slug: 'how-to-place-boilers-furnaces-vastu',
      date: 'June 28, 2026',
      author: 'Vastu Specialist Team',
      category: 'Commercial & Industrial',
      shortDescription: 'Improper fire elements cause friction and heavy expenses. Master the Southeast zone placement rules.',
      content: 'Fire (Agni) represents power, drive, and wealth. Placing boilers, generators, computer servers, or heavy electrical panels in the wrong quadrant (like Northeast) causes direct cash-flow losses, legal issues, or accidental damage. Here we discuss structural mappings for corporate workspaces, locating electrical hubs in the Southeast, and simple remedies if your server room is permanently stuck in the North.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
      readTime: '8 min read',
      status: 'Published'
    },
    {
      title: 'Understanding Pancha Bhootas: The Five Elements of Architecture',
      slug: 'understanding-pancha-bhoot-architecture',
      date: 'May 15, 2026',
      author: 'Acharya Raghavendra',
      category: 'Vastu Philosophy',
      shortDescription: 'Discover the profound connection between nature’s elements—Earth, Water, Fire, Air, and Space—and modern structural design.',
      content: 'Pancha Bhootas are the building blocks of existence. When we construct a building, we partition space, which changes the local dynamics of Earth, Air, Water, and Fire. Learn how traditional Indian temple architecture and home builders harmonize these forces to create structures that stand for centuries while radiating positive vibrations.',
      image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800',
      readTime: '6 min read',
      status: 'Published'
    }
  ];

  for (const item of initial) {
    const exists = await Blog.findOne({ slug: item.slug });
    if (!exists) {
      await Blog.create(item);
    }
  }
};

export const getPublishedBlogs = async () => {
  await seedInitialBlogs();
  const now = new Date();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  
  return blogs.filter((blog) => {
    if (blog.status === "Draft") return false;
    if (blog.status === "Scheduled") {
      const publishDate = new Date(blog.date);
      return now >= publishDate;
    }
    return true;
  });
};

export const getBlogBySlug = async (slug) => {
  await seedInitialBlogs();
  const blog = await Blog.findOne({ slug });
  if (!blog) {
    const error = new Error("Blog not found");
    error.statusCode = 404;
    throw error;
  }
  return blog;
};

export const getRelatedBlogs = async (slug) => {
  await seedInitialBlogs();
  const currentBlog = await Blog.findOne({ slug });
  if (!currentBlog) return [];

  const allBlogs = await Blog.find({ slug: { $ne: slug } });
  const now = new Date();

  return allBlogs
    .filter((blog) => {
      if (blog.status === "Draft") return false;
      if (blog.status === "Scheduled") {
        const publishDate = new Date(blog.date);
        return now >= publishDate;
      }
      return blog.category === currentBlog.category;
    })
    .slice(0, 2);
};

export const getAllBlogsAdmin = async () => {
  await seedInitialBlogs();
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

  return Blog.create({
    ...data,
    slug
  });
};

export const updateBlog = async (id, data) => {
  const blog = await Blog.findByIdAndUpdate(id, { $set: data }, { new: true });
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
