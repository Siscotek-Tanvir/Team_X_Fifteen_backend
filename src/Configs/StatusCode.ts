import { StatusCodes } from "http-status-codes";

const ok = StatusCodes.OK; // 200
const create = StatusCodes.CREATED; // 201
const bad_req = StatusCodes.BAD_REQUEST; // 400
const unAuthorized = StatusCodes.UNAUTHORIZED; // 401
const forbidden = StatusCodes.FORBIDDEN; // 403
const notFound = StatusCodes.NOT_FOUND; // 404
const conflict = StatusCodes.CONFLICT; // 409
const serverError = StatusCodes.INTERNAL_SERVER_ERROR; // 500
const serviceUnavaiAble = StatusCodes.SERVICE_UNAVAILABLE; // 503

export const statusCodes = {
  ok,
  create,
  bad_req,
  unAuthorized,
  forbidden,
  notFound,
  conflict,
  serverError,
  serviceUnavaiAble,
};
