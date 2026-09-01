import { Request, Response } from "express";
import { statusCodes } from "../../Configs/StatusCode";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/response";
import { EventServices } from "./event.service";

const seedEvents = catchAsync(async (req: Request, res: Response) => {
  const overwrite = req.query.overwrite === "true";
  const result = await EventServices.seedEventsToDB(overwrite);

  sendResponse(res, {
    statusCode: statusCodes.create,
    success: true,
    message: result.message,
    data: result,
  });
});

const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.getAllEventsFromDB(req.query);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "Events fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventServices.getSingleEventByIdFromDB(id);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "Event details retrieved successfully",
    data: result,
  });
});

const getFeaturedEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.getFeaturedEventsFromDB();

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "Featured events retrieved successfully",
    data: result,
  });
});

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.createEventInDB(req.body);

  sendResponse(res, {
    statusCode: statusCodes.create,
    success: true,
    message: "Event created successfully",
    data: result,
  });
});

const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventServices.updateEventInDB(id, req.body);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "Event updated successfully",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventServices.deleteEventFromDB(id);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "Event deleted successfully",
    data: result,
  });
});

const registerForEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EventServices.registerForEventInDB(id, req.body);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "Successfully registered for event",
    data: result,
  });
});

const getEventCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.getEventCategoriesFromDB();

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "Event categories retrieved successfully",
    data: result,
  });
});

const getEventDepartments = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.getEventDepartmentsFromDB();

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "Event departments retrieved successfully",
    data: result,
  });
});

const getEventStats = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.getEventStatsFromDB();

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "Event statistics retrieved successfully",
    data: result,
  });
});

export const EventControllers = {
  seedEvents,
  getAllEvents,
  getSingleEvent,
  getFeaturedEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventCategories,
  getEventDepartments,
  getEventStats,
};
