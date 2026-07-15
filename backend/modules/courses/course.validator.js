import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(150),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().optional(),
  price: z.number().nonnegative("Price must be a positive number"),
  originalPrice: z.number().nonnegative("Original price must be positive").optional(),
  duration: z.string().optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Category ID"),
  instructor: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Instructor ID"),
  benefits: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  certificateImageUrl: z.string().optional(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
  status: z.enum(["draft", "published"]).optional(),
  isActive: z.boolean().optional(),
});

export const updateCourseSchema = createCourseSchema.partial();

export const createLessonSchema = z.object({
  sectionTitle: z.string().min(1, "Section title is required"),
  title: z.string().min(1, "Lesson title is required"),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  videoDuration: z.string().optional(),
  order: z.number().int().optional(),
  isPreview: z.boolean().optional(),
});

export const updateLessonSchema = createLessonSchema.partial();

export const reorderCurriculumSchema = z.object({
  curriculum: z.array(
    z.object({
      sectionTitle: z.string(),
      order: z.number().int(),
      lessons: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)),
    })
  ),
});

export const createCourseCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateCourseCategorySchema = createCourseCategorySchema.partial();
