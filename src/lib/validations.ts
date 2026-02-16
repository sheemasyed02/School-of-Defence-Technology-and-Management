import { z } from "zod";

export const facultySchema = z.object({
  name: z.string().min(2, "Name is required"),
  designation: z.string().min(2, "Designation is required"),
  department: z.string().min(2, "Department is required"),
  bio: z.string().optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  imageUrl: z.string().optional().or(z.literal('')),
  publications: z.string().optional().or(z.literal('')),
  qualification: z.string().optional().or(z.literal('')),
  experience: z.string().optional().or(z.literal('')),
  research: z.string().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  order: z.coerce.number().int().optional().default(0),
  isVisible: z.boolean().optional().default(true),
});

export type FacultyFormValues = z.infer<typeof facultySchema>;

// Common schemas for other entities
export const eventSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional().or(z.literal('')),
  date: z.string().optional().or(z.literal('')),
  venue: z.string().optional().or(z.literal('')),
  imageUrl: z.string().url().optional().or(z.literal('')),
  type: z.string().optional().default("Workshop"),
  status: z.enum(["UPCOMING", "PAST"]).default("UPCOMING"),
  registration_enabled: z.boolean().optional().default(false),
  form_config: z.array(z.object({
    label: z.string(),
    type: z.string(),
    required: z.boolean().optional(),
    options: z.string().optional()
  })).optional().default([]),
  isVisible: z.boolean().optional().default(true),
});

export type EventFormValues = z.infer<typeof eventSchema>;

export const announcementSchema = z.object({
  title: z.string().min(2, "Title is required"),
  body: z.string().optional().or(z.literal('')),
  date: z.string().min(1, "Date is required"),
  priority: z.enum(["REGULAR", "IMPORTANT", "URGENT"]).optional().default("REGULAR"),
  isVisible: z.boolean().optional().default(true),
});

export const programSchema = z.object({
  title: z.string().min(2, "Title is required"),
  degree: z.string().min(1, "Degree is required"),
  duration: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  curriculum: z.string().optional().or(z.literal('')),
  eligibility: z.string().optional().or(z.literal('')),
  intake: z.string().optional().or(z.literal('')),
  outcomes: z.string().optional().or(z.literal('')),
  isVisible: z.boolean().optional().default(true),
});

export const researchSchema = z.object({
  type: z.enum(["PUBLICATION", "PROJECT", "PATENT"]),
  title: z.string().min(2, "Title is required"),
  authors: z.string().optional().or(z.literal('')), // Authors, Leads, Inventors
  publicationDate: z.string().optional().or(z.literal('')), // Publication Date, Filing Date
  startDate: z.string().optional().or(z.literal('')), // Project Start
  endDate: z.string().optional().or(z.literal('')), // Project End
  journal: z.string().optional().or(z.literal('')), // Journal, Funding Agency, Patent Office/Number
  status: z.string().optional().or(z.literal('')), // Ongoing, Completed, Granted
  link: z.string().url().optional().or(z.literal('')), // DOI, Website
  abstract: z.string().optional().or(z.literal('')),
  isVisible: z.boolean(),
});

export type ResearchFormValues = z.infer<typeof researchSchema>;

export const gallerySchema = z.object({
  title: z.string().optional().or(z.literal('')),
  type: z.enum(["image", "video"]).optional().default("image"),
  url: z.string().min(1, "URL is required"),
  category: z.string().optional().or(z.literal('')),
  date: z.string().optional(),
  isVisible: z.boolean().optional().default(true),
});

export const placementSchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  company: z.string().min(1, "Company is required"),
  role: z.string().optional().or(z.literal('')),
  batch: z.string().optional().or(z.literal('')),
  imageUrl: z.string().url().optional().or(z.literal('')),
  package: z.string().optional().or(z.literal('')),
  isVisible: z.boolean().optional().default(true),
});

export const userSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  name: z.string().optional().or(z.literal('')),
  role: z.enum(["SUPER_ADMIN", "EDITOR", "FACULTY_ADMIN"]).default("EDITOR"),
});

export const settingsSchema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string().optional().or(z.literal('')),
  category: z.string().optional().or(z.literal('')),
});

export const studentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  program_type: z.enum(["M.Tech", "Ph.D"]),
  imageUrl: z.string().optional().or(z.literal('')),
  order: z.coerce.number().int().optional().default(0),
});

export type StudentFormValues = z.infer<typeof studentSchema>;

export const alumniSchema = z.object({
  name: z.string().min(2, "Name is required"),
  batch: z.string().min(4, "Batch year is required"), // e.g. "2020"
  role: z.string().min(2, "Role is required"),
  company: z.string().optional().or(z.literal('')),
  imageUrl: z.string().optional().or(z.literal('')),
  order: z.coerce.number().int().optional().default(0),
});

export type AlumniFormValues = z.infer<typeof alumniSchema>;

export const pageContentSchema = z.object({
  page: z.string().min(2, "Page name is required"),
  section: z.string().min(2, "Section name is required"),
  content: z.string().min(1, "Content is required"),
  isVisible: z.boolean().optional(),
});

export type PageContentFormValues = z.infer<typeof pageContentSchema>;
