import { z } from "zod";

export const updateUserProfileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50).optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50).optional(),
  phone: z.string().optional(),
});
