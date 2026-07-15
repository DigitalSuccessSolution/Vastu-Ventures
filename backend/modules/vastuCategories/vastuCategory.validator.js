import { z } from "zod";

export const createVastuCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  description: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const updateVastuCategorySchema = createVastuCategorySchema.partial();
