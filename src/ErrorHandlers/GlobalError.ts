import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

type globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => void;

const globalError: globalErrorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || error.status || 500;
  let message = error.message || "Internal Server Error";

  // Handle Mongoose CastError (invalid ObjectId)
  if (error.name === "CastError") {
    message = `Invalid value for ${error.path}: ${error.value}`;
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message,
      errorType: error.name,
    });
  }

  // Handle Mongoose Duplicate Key Error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue || {}).join(", ");
    message = `Duplicate value for field(s): ${field}`;
    return res.status(409).json({
      success: false,
      statusCode: 409,
      message,
      errorType: error?.name || "Duplicate Error",
    });
  }

  // Handle Mongoose ValidationError
  if (error.name === "ValidationError") {
    const validationErrors = Object.values(error.errors || {}).map((err: any) => err.message);
    message = `${validationErrors.join(", ")}`;
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message,
      errorType: error?.name,
    });
  }

  // Handle Zod Validation Errors
  if (error instanceof ZodError) {
    const issues = (error as any).issues || (error as any).errors || [];
    const validationErrors = issues.map(
      (err: any) => `${Array.isArray(err.path) ? err.path.join(".") : ""}: ${err.message}`
    );
    message = validationErrors.length > 0 ? validationErrors.join(", ") : error.message;
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message,
      details: validationErrors,
      errorType: error?.name || "Validation Error",
    });
  }

  // Handle any other generic errors
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error: process.env.NODE_ENV === "development" ? error : undefined,
    errorType: error?.name || "AppError",
  });
};

export default globalError;
