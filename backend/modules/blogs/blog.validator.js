import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150),
  content: z.string().min(20, "Content must be at least 20 characters"),
  shortDescription: z.string().optional(),
  featuredImage: z.object({
    url: z.string(),
    publicId: z.string(),
  }).optional(),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Category ID"),
  readTime: z.string().optional(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
  status: z.enum(["draft", "published"]).optional(),
});

export const updateBlogSchema = createBlogSchema.partial();

export const createBlogCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateBlogCategorySchema = createBlogCategorySchema.partial();
