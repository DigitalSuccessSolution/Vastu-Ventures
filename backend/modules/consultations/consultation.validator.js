import { z } from "zod";

export const bookConsultationSchema = z.object({
  service: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Service ID"),
  consultationType: z.enum(["online", "offline"]),
  preferredDate: z.string().transform((val) => new Date(val)),
  preferredTimeSlot: z.string().min(1, "Preferred time slot is required"),
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export const submitInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  serviceInterest: z.string().optional(),
  notes: z.string().optional(),
});

export const updateConsultationStatusSchema = z.object({
  status: z.enum(["pending", "approved", "rejected", "rescheduled", "completed"]),
  adminNotes: z.string().optional(),
  rescheduledDate: z.string().transform((val) => new Date(val)).optional(),
  rescheduledTimeSlot: z.string().optional(),
});
