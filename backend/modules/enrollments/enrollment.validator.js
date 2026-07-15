import { z } from "zod";

export const updateWatchProgressSchema = z.object({
  watchPercentage: z.number().min(0, "Minimum watch percentage is 0").max(100, "Maximum watch percentage is 100"),
});
