import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/error-handler.utils";

// Every request that throws an error will pass through this middleware
// as long as the middleware is plugged into your application it will do its job
// by default the next function is called automatically so there is no need of calling it
export const globalErrorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errorHandler = new ErrorHandler();

  errorHandler.handleError(err, res);
};
