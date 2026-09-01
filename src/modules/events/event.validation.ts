import { z } from "zod";

const scheduleValidationSchema = z.object({
  time: z.string({ required_error: "Schedule time is required" }),
  activity: z.string({ required_error: "Activity is required" }),
  description: z.string().optional(),
  speakerName: z.string().optional(),
});

const speakerValidationSchema = z.object({
  id: z.string({ required_error: "Speaker ID is required" }),
  name: z.string({ required_error: "Speaker name is required" }),
  title: z.string({ required_error: "Speaker title is required" }),
  organization: z.string({ required_error: "Speaker organization is required" }),
  credentials: z.string().optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  bio: z.string({ required_error: "Speaker bio is required" }),
  email: z.string().email().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
});

export const createEventValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "Event ID is required" }),
    title: z.string({ required_error: "Title is required" }),
    subtitle: z.string().optional(),
    type: z.string({ required_error: "Event type is required" }),
    category: z.string({ required_error: "Category is required" }),
    department: z.string({ required_error: "Department is required" }),
    organizer: z.string({ required_error: "Organizer is required" }),
    date: z.string({ required_error: "Date is required" }),
    displayDate: z.string().optional(),
    time: z.string({ required_error: "Time is required" }),
    location: z.string({ required_error: "Location is required" }),
    roomNumber: z.string().optional(),
    fee: z.string().default("Free"),
    capacity: z.number({ required_error: "Capacity is required" }).min(1),
    registeredCount: z.number().default(0),
    coverImage: z.string({ required_error: "Cover image URL is required" }),
    tags: z.array(z.string()).default([]),
    shortDescription: z.string({ required_error: "Short description is required" }),
    fullDescription: z.string({ required_error: "Full description is required" }),
    learningOutcomes: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).optional(),
    schedule: z.array(scheduleValidationSchema).default([]),
    speakers: z.array(speakerValidationSchema).default([]),
    featured: z.boolean().default(false),
    status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]).default("upcoming"),
    contactEmail: z.string().email().optional().or(z.literal("")),
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
    status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]).optional(),
    contactEmail: z.string().email().optional().or(z.literal("")),
    contactPhone: z.string().optional(),
  }),
});

export const registerEventValidationSchema = z.object({
  body: z.object({
    fullName: z.string({ required_error: "Full name is required" }),
    email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
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
