import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150),
  content: z.string().min(20, "Content must be at least 20 characters"),
  shortDescription: z.string().optional(),
  image: z.string().optional(),
  category: z.string().min(2, "Category must be at least 2 characters").optional(),
  author: z.string().optional(),
  readTime: z.string().optional(),
  date: z.string().optional(),
  status: z.enum(["Draft", "Published", "Scheduled"]).optional(),
  slug: z.string().optional(),
});

export const updateBlogSchema = createBlogSchema.partial();

export const createBlogCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateBlogCategorySchema = createBlogCategorySchema.partial();
