import { z } from "zod";

export const createReviewSchema = z.object({
  reviewableType: z.enum(["course", "service"]),
  courseId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  serviceId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  title: z.string().max(100).optional(),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});
