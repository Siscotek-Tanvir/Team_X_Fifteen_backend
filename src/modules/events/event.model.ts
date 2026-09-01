import { Schema, model } from "mongoose";
import { IEvent, IEventModel, ISchedule, ISpeaker } from "./event.interface";

const ScheduleSchema = new Schema<ISchedule>(
  {
    time: { type: String, required: true },
    activity: { type: String, required: true },
    description: { type: String },
    speakerName: { type: String },
  },
  { _id: false }
);

const SpeakerSchema = new Schema<ISpeaker>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    organization: { type: String, required: true },
    credentials: { type: String },
    avatarUrl: { type: String },
    bio: { type: String, required: true },
    email: { type: String },
    linkedin: { type: String },
  },
  { _id: false }
);

const EventSchema = new Schema<IEvent, IEventModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    organizer: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      index: true,
    },
    displayDate: {
      type: String,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
    },
    fee: {
      type: String,
      required: true,
      default: "Free",
    },
    capacity: {
      type: Number,
      required: true,
      min: 0,
    },
    registeredCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    coverImage: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    learningOutcomes: {
      type: [String],
      default: [],
    },
    prerequisites: {
      type: [String],
      default: [],
    },
    schedule: {
      type: [ScheduleSchema],
      default: [],
    },
    speakers: {
      type: [SpeakerSchema],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
      index: true,
    },
    contactEmail: {
      type: String,
      trim: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Indexes for high performance search
EventSchema.index({
  title: "text",
  shortDescription: "text",
  fullDescription: "text",
  category: "text",
  department: "text",
  organizer: "text",
  tags: "text",
});

EventSchema.statics.isEventExistById = async function (id: string) {
  return await this.findOne({ id });
};

export const EventModel = model<IEvent, IEventModel>("Event", EventSchema);
