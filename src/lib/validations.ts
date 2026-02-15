import { z } from "zod";

export const facultySchema = z.object({
  name: z.string().min(2, "Name is required"),
  designation: z.string().min(2, "Designation is required"),
  department: z.string().min(2, "Department is required"),
  bio: z.string().optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  imageUrl: z.string().url().optional().or(z.literal('')),
  publications: z.string().optional().or(z.literal('')),
  qualification: z.string().optional().or(z.literal('')), // New
  experience: z.string().optional().or(z.literal('')),   // New
  research: z.string().optional().or(z.literal('')),     // New
  phone: z.string().optional().or(z.literal('')),        // New
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

export type FacultyFormValues = z.infer<typeof facultySchema>;
