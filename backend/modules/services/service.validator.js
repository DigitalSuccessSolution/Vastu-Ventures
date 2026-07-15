import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Category ID"),
  icon: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  longDescription: z.string().optional(),
  price: z.number().nonnegative("Price must be a positive number"),
  benefits: z.array(z.string()).optional(),
  process: z.array(
    z.object({
      step: z.number().int(),
      title: z.string(),
      description: z.string(),
    })
  ).optional(),
  onlineAvailable: z.boolean().optional(),
  offlineAvailable: z.boolean().optional(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
  faqs: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
  relatedServices: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
  isActive: z.boolean().optional(),
});

export const updateServiceSchema = createServiceSchema.partial();
