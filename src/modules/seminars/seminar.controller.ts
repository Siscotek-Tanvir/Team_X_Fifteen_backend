import { Request, Response } from "express";
import { statusCodes } from "../../Configs/StatusCode";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/response";
import { EventServices } from "../events/event.service";

const getAllSeminars = catchAsync(async (req: Request, res: Response) => {
  const query = { ...req.query, type: "seminar" };
  const result = await EventServices.getAllEventsFromDB(query);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "Seminars fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSeminar = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await EventServices.getSingleEventByIdFromDB(id);

  sendResponse(res, {
    statusCode: statusCodes.ok,
    success: true,
    message: "Seminar details retrieved successfully",
    data: result,
  });
});

export const SeminarControllers = {
  getAllSeminars,
  getSingleSeminar,
};
