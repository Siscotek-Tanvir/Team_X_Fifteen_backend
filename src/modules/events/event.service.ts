import mongoose from "mongoose";
import { statusCodes } from "../../Configs/StatusCode";
import AppError from "../../ErrorHandlers/AppError";
import { EVENTS_DATA, eventSearchableFields } from "./event.constant";
import { IEvent, IEventFilters, IEventRegistration } from "./event.interface";
import { EventModel } from "./event.model";

/**
 * Auto-seeds initial data into MongoDB if the events collection is empty
 */
const seedInitialEventsIfEmpty = async () => {
  try {
    const count = await EventModel.countDocuments();
    if (count === 0) {
      console.log("Database is empty. Seeding initial EVENTS_DATA...");
      await EventModel.insertMany(EVENTS_DATA);
      console.log(`Successfully seeded ${EVENTS_DATA.length} events into MongoDB.`);
    }
  } catch (error) {
    console.error("Error during initial events auto-seeding:", error);
  }
};

/**
 * Manual or forced seed of initial EVENTS_DATA
 */
const seedEventsToDB = async (overwrite = false) => {
  if (overwrite) {
    await EventModel.deleteMany({});
    const inserted = await EventModel.insertMany(EVENTS_DATA);
    return {
      message: `Reset and seeded ${inserted.length} default events successfully.`,
      count: inserted.length,
      data: inserted,
    };
  }

  // Upsert all default events by custom `id`
  const bulkOps = EVENTS_DATA.map((event) => ({
    updateOne: {
      filter: { id: event.id },
      update: { $set: event },
      upsert: true,
    },
  }));

  const result = await EventModel.bulkWrite(bulkOps);
  const total = await EventModel.countDocuments();

  return {
    message: "Events synchronized and seeded successfully.",
    upsertedCount: result.upsertedCount,
    modifiedCount: result.modifiedCount,
    matchedCount: result.matchedCount,
    totalEvents: total,
  };
};

/**
 * Get all events with rich search, filters, sorting and pagination
 */
const getAllEventsFromDB = async (query: IEventFilters) => {
  // Ensure DB has data if this is the first call
  const initialCount = await EventModel.countDocuments();
  if (initialCount === 0) {
    await seedInitialEventsIfEmpty();
  }

  const {
    searchTerm,
    search,
    type,
    category,
    department,
    organizer,
    featured,
    status,
    date,
    startDate,
    endDate,
    minCapacity,
    maxCapacity,
    isFree,
    tag,
    page = 1,
    limit = 10,
    sortBy = "date",
    sortOrder = "asc",
  } = query;

  const filterConditions: Record<string, any> = {};

  // Search by keyword
  const effectiveSearch = searchTerm || search;
  if (effectiveSearch) {
    filterConditions.$or = eventSearchableFields.map((field) => ({
      [field]: { $regex: effectiveSearch, $options: "i" },
    }));
  }

  // Exact & Regex filters
  if (type) {
    filterConditions.type = { $regex: `^${type}$`, $options: "i" };
  }

  if (category && category !== "all") {
    filterConditions.category = { $regex: category, $options: "i" };
  }

  if (department && department !== "all") {
    filterConditions.department = { $regex: department, $options: "i" };
  }

  if (organizer) {
    filterConditions.organizer = { $regex: organizer, $options: "i" };
  }

  if (featured !== undefined) {
    filterConditions.featured = featured === true || featured === "true";
  }

  if (status) {
    filterConditions.status = { $regex: `^${status}$`, $options: "i" };
  }

  if (date) {
    filterConditions.date = date;
  } else if (startDate || endDate) {
    filterConditions.date = {};
    if (startDate) {
      filterConditions.date.$gte = startDate;
    }
    if (endDate) {
      filterConditions.date.$lte = endDate;
    }
  }

  if (minCapacity || maxCapacity) {
    filterConditions.capacity = {};
    if (minCapacity) {
      filterConditions.capacity.$gte = Number(minCapacity);
    }
    if (maxCapacity) {
      filterConditions.capacity.$lte = Number(maxCapacity);
    }
  }

  if (isFree !== undefined) {
    const isFreeBool = isFree === true || isFree === "true";
    if (isFreeBool) {
      filterConditions.fee = { $regex: "free", $options: "i" };
    } else {
      filterConditions.fee = { $not: /free/i };
    }
  }

  if (tag) {
    filterConditions.tags = { $in: [new RegExp(`^${tag}$`, "i")] };
  }

  // Pagination & Sorting
  const parsedPage = Math.max(1, Number(page) || 1);
  const parsedLimit = Number(limit) === 0 || Number(limit) === -1 ? 0 : Math.max(1, Number(limit) || 10);
  const skip = parsedLimit > 0 ? (parsedPage - 1) * parsedLimit : 0;

  const sortDirection: 1 | -1 = sortOrder === "desc" || sortOrder === -1 ? -1 : 1;
  const sortOptions: Record<string, 1 | -1> = {
    [sortBy]: sortDirection,
  };

  const total = await EventModel.countDocuments(filterConditions);

  let queryBuilder = EventModel.find(filterConditions).sort(sortOptions);

  if (parsedLimit > 0) {
    queryBuilder = queryBuilder.skip(skip).limit(parsedLimit);
  }

  const events = await queryBuilder.exec();

  const totalPage = parsedLimit > 0 ? Math.ceil(total / parsedLimit) : 1;

  return {
    meta: {
      page: parsedPage,
      limit: parsedLimit > 0 ? parsedLimit : total,
      total,
      totalPage,
    },
    data: events,
  };
};

/**
 * Find single event by slug 'id' or MongoDB '_id'
 */
const getSingleEventByIdFromDB = async (idOrSlug: string) => {
  let event = await EventModel.findOne({ id: idOrSlug });

  if (!event && mongoose.Types.ObjectId.isValid(idOrSlug)) {
    event = await EventModel.findById(idOrSlug);
  }

  if (!event) {
    // If DB is empty, try seeding and searching again
    const count = await EventModel.countDocuments();
    if (count === 0) {
      await seedInitialEventsIfEmpty();
      event = await EventModel.findOne({ id: idOrSlug });
    }
  }

  if (!event) {
    throw new AppError(statusCodes.notFound, `Event not found with ID: ${idOrSlug}`);
  }

  return event;
};

/**
 * Get featured events
 */
const getFeaturedEventsFromDB = async () => {
  const count = await EventModel.countDocuments();
  if (count === 0) {
    await seedInitialEventsIfEmpty();
  }

  return await EventModel.find({ featured: true }).sort({ date: 1 });
};

/**
 * Create a new event
 */
const createEventInDB = async (payload: IEvent) => {
  const existing = await EventModel.findOne({ id: payload.id });
  if (existing) {
    throw new AppError(statusCodes.conflict, `Event with id '${payload.id}' already exists.`);
  }

  const newEvent = await EventModel.create(payload);
  return newEvent;
};

/**
 * Update an existing event
 */
const updateEventInDB = async (idOrSlug: string, payload: Partial<IEvent>) => {
  const query = mongoose.Types.ObjectId.isValid(idOrSlug)
    ? { $or: [{ id: idOrSlug }, { _id: idOrSlug }] }
    : { id: idOrSlug };

  const updatedEvent = await EventModel.findOneAndUpdate(query, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedEvent) {
    throw new AppError(statusCodes.notFound, `Event with ID '${idOrSlug}' not found.`);
  }

  return updatedEvent;
};

/**
 * Delete an event
 */
const deleteEventFromDB = async (idOrSlug: string) => {
  const query = mongoose.Types.ObjectId.isValid(idOrSlug)
    ? { $or: [{ id: idOrSlug }, { _id: idOrSlug }] }
    : { id: idOrSlug };

  const deletedEvent = await EventModel.findOneAndDelete(query);

  if (!deletedEvent) {
    throw new AppError(statusCodes.notFound, `Event with ID '${idOrSlug}' not found.`);
  }

  return deletedEvent;
};

/**
 * Register user for an event
 */
const registerForEventInDB = async (idOrSlug: string, registrationData: IEventRegistration) => {
  const query = mongoose.Types.ObjectId.isValid(idOrSlug)
    ? { $or: [{ id: idOrSlug }, { _id: idOrSlug }] }
    : { id: idOrSlug };

  const event = await EventModel.findOne(query);

  if (!event) {
    throw new AppError(statusCodes.notFound, `Event with ID '${idOrSlug}' not found.`);
  }

  if (event.registeredCount >= event.capacity) {
    throw new AppError(statusCodes.bad_req, "Registration failed: This event is already at full capacity.");
  }

  event.registeredCount += 1;
  await event.save();

  return {
    eventTitle: event.title,
    eventId: event.id,
    participant: registrationData,
    registrationTimestamp: new Date().toISOString(),
    remainingSeats: event.capacity - event.registeredCount,
    updatedEvent: event,
  };
};

/**
 * Get distinct categories with count
 */
const getEventCategoriesFromDB = async () => {
  const categories = await EventModel.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        count: 1,
      },
    },
    { $sort: { count: -1 } },
  ]);

  return categories;
};

/**
 * Get distinct departments with count
 */
const getEventDepartmentsFromDB = async () => {
  const departments = await EventModel.aggregate([
    {
      $group: {
        _id: "$department",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        department: "$_id",
        count: 1,
      },
    },
    { $sort: { count: -1 } },
  ]);

  return departments;
};

/**
 * Get global event statistics
 */
const getEventStatsFromDB = async () => {
  const totalEvents = await EventModel.countDocuments();
  const upcomingEvents = await EventModel.countDocuments({ status: "upcoming" });
  const featuredEvents = await EventModel.countDocuments({ featured: true });

  const aggregateMetrics = await EventModel.aggregate([
    {
      $group: {
        _id: null,
        totalCapacity: { $sum: "$capacity" },
        totalRegistered: { $sum: "$registeredCount" },
      },
    },
  ]);

  const totalCapacity = aggregateMetrics[0]?.totalCapacity || 0;
  const totalRegistered = aggregateMetrics[0]?.totalRegistered || 0;
  const overallOccupancyRate = totalCapacity > 0 ? `${((totalRegistered / totalCapacity) * 100).toFixed(1)}%` : "0%";

  return {
    totalEvents,
    upcomingEvents,
    featuredEvents,
    totalCapacity,
    totalRegistered,
    overallOccupancyRate,
  };
};

export const EventServices = {
  seedInitialEventsIfEmpty,
  seedEventsToDB,
  getAllEventsFromDB,
  getSingleEventByIdFromDB,
  getFeaturedEventsFromDB,
  createEventInDB,
  updateEventInDB,
  deleteEventFromDB,
  registerForEventInDB,
  getEventCategoriesFromDB,
  getEventDepartmentsFromDB,
  getEventStatsFromDB,
};
