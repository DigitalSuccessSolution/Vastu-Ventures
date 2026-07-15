import { z } from "zod";

export const createFaqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(5, "Answer must be at least 5 characters"),
  category: z.enum(["general", "consultations", "education", "payments"]),
  relatedService: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  relatedCourse: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const updateFaqSchema = createFaqSchema.partial();
