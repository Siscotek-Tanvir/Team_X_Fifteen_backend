import { Response } from "express";
import { statusCodes } from "../Configs/StatusCode";

export interface IApiResponse<T> {
  statusCode?: number;
  success: boolean;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
  };
  data?: T;
}

export const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
  res.status(data.statusCode || statusCodes.ok).json({
    success: data.success,
    statusCode: data.statusCode || statusCodes.ok,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

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
    message: "Missing required fields. Please provide all necessary credentials.",
  });
};

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
