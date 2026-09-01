import { Model } from "mongoose";

export interface ISchedule {
  time: string;
  activity: string;
  description?: string;
  speakerName?: string;
}

export interface ISpeaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  credentials?: string;
  avatarUrl?: string;
  bio: string;
  email?: string;
  linkedin?: string;
}

export interface IEvent {
  _id?: string;
  id: string;
  title: string;
  subtitle?: string;
  type: string;
  category: string;
  department: string;
  organizer: string;
  date: string;
  displayDate?: string;
  time: string;
  location: string;
  roomNumber?: string;
  fee: string;
  capacity: number;
  registeredCount: number;
  coverImage: string;
  tags: string[];
  shortDescription: string;
  fullDescription: string;
  learningOutcomes: string[];
  prerequisites?: string[];
  schedule: ISchedule[];
  speakers: ISpeaker[];
  featured: boolean;
  status: "upcoming" | "ongoing" | "completed" | "cancelled" | string;
  contactEmail?: string;
  contactPhone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IEventFilters {
  searchTerm?: string;
  search?: string;
  type?: string;
  category?: string;
  department?: string;
  organizer?: string;
  featured?: string | boolean;
  status?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  minCapacity?: number | string;
  maxCapacity?: number | string;
  isFree?: string | boolean;
  tag?: string;
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: "asc" | "desc" | 1 | -1;
}

export interface IEventRegistration {
  fullName: string;
  email: string;
  phone?: string;
  studentId?: string;
  department?: string;
}

export interface IEventModel extends Model<IEvent> {
  isEventExistById(id: string): Promise<IEvent | null>;
}
