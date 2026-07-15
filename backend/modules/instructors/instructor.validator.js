import { z } from "zod";

export const createInstructorSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  displayName: z.string().min(2, "Display name is required"),
  bio: z.string().optional(),
  specializations: z.array(z.string()).optional(),
  socialLinks: z.object({
    website: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
  }).optional(),
});

export const updateInstructorSchema = z.object({
  displayName: z.string().min(2).optional(),
  bio: z.string().optional(),
  specializations: z.array(z.string()).optional(),
  socialLinks: z.object({
    website: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
  }).optional(),
  isActive: z.boolean().optional(),
});

export const assignCourseSchema = z.object({
  courseId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Course ID"),
});
