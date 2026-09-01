import { z } from "zod";

const scheduleValidationSchema = z.object({
  time: z.string({ message: "Schedule time is required" }),
  activity: z.string({ message: "Activity is required" }),
  description: z.string().optional(),
  speakerName: z.string().optional(),
});

const speakerValidationSchema = z.object({
  id: z.string({ message: "Speaker ID is required" }),
  name: z.string({ message: "Speaker name is required" }),
  title: z.string({ message: "Speaker title is required" }),
  organization: z.string({ message: "Speaker organization is required" }),
  credentials: z.string().optional(),
  avatarUrl: z.string().optional(),
  bio: z.string({ message: "Speaker bio is required" }),
  email: z.string().optional(),
  linkedin: z.string().optional(),
});

export const createEventValidationSchema = z.object({
  body: z.object({
    id: z.string({ message: "Event ID is required" }),
    title: z.string({ message: "Title is required" }),
    subtitle: z.string().optional(),
    type: z.string({ message: "Event type is required" }),
    category: z.string({ message: "Category is required" }),
    department: z.string({ message: "Department is required" }),
    organizer: z.string({ message: "Organizer is required" }),
    date: z.string({ message: "Date is required" }),
    displayDate: z.string().optional(),
    time: z.string({ message: "Time is required" }),
    location: z.string({ message: "Location is required" }),
    roomNumber: z.string().optional(),
    fee: z.string().default("Free"),
    capacity: z.number({ message: "Capacity is required" }).min(1, "Capacity must be at least 1"),
    registeredCount: z.number().default(0),
    coverImage: z.string({ message: "Cover image URL is required" }),
    tags: z.array(z.string()).default([]),
    shortDescription: z.string({ message: "Short description is required" }),
    fullDescription: z.string({ message: "Full description is required" }),
    learningOutcomes: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).optional(),
    schedule: z.array(scheduleValidationSchema).default([]),
    speakers: z.array(speakerValidationSchema).default([]),
    featured: z.boolean().default(false),
    status: z.enum(["upcoming", "ongoing", "completed", "cancelled"] as const).default("upcoming"),
    contactEmail: z.string().optional(),
    contactPhone: z.string().optional(),
  }),
});

export const updateEventValidationSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    type: z.string().optional(),
    category: z.string().optional(),
    department: z.string().optional(),
    organizer: z.string().optional(),
    date: z.string().optional(),
    displayDate: z.string().optional(),
    time: z.string().optional(),
    location: z.string().optional(),
    roomNumber: z.string().optional(),
    fee: z.string().optional(),
    capacity: z.number().min(1).optional(),
    registeredCount: z.number().min(0).optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    shortDescription: z.string().optional(),
    fullDescription: z.string().optional(),
    learningOutcomes: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    schedule: z.array(scheduleValidationSchema).optional(),
    speakers: z.array(speakerValidationSchema).optional(),
    featured: z.boolean().optional(),
    status: z.enum(["upcoming", "ongoing", "completed", "cancelled"] as const).optional(),
    contactEmail: z.string().optional(),
    contactPhone: z.string().optional(),
  }),
});

export const registerEventValidationSchema = z.object({
  body: z.object({
    fullName: z.string({ message: "Full name is required" }),
    email: z.string({ message: "Email is required" }).email("Invalid email address"),
    phone: z.string().optional(),
    studentId: z.string().optional(),
    department: z.string().optional(),
  }),
});

export const EventValidations = {
  createEventValidationSchema,
  updateEventValidationSchema,
  registerEventValidationSchema,
};
