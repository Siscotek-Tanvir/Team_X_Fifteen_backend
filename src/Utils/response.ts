import { Response } from "express";
import { statusCodes } from "../Configs/StatusCode";

export const emptyResponse = (res: Response, data: any) => {
  return res.status(statusCodes.notFound).json({
    success: false,
    message: "No data found, Database is Empty.",
    data,
  });
};

export const notUpdated = (res: Response, id: string, data: any) => {
  res.status(statusCodes.notFound).json({
    success: false,
    message: `Not found, make sure the id:${id} is correct. `,
    data,
  });
};

export const notGiven = (res: Response) => {
  res.status(statusCodes.serviceUnavaiAble).json({
    success: false,
    message: "Missing required fields. Please provide all necessary credentials."
  })
}

export const alreadyExist = (res: Response, data: any) => {
  res.status(statusCodes.conflict).json({
    success: false,
    message: `Document already exists. Duplicate creation is not allowed.`,
    data,
  });
};
export const success = (res: Response, data: any, message: string, total?: number) => {
  res.status(statusCodes.ok).json({
    success: true,
    message: `${message} successfully`,
    ...(total !== undefined && { total }),
    data,
  });
};
