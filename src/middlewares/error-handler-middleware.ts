import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorHandlerHelper } from "../helpers/error-handler-helper";

export class ErrorHandlerMiddleware {
  static async handle(
    error: Error & Partial<ErrorHandlerHelper>,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const statusCode = error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error?.statusCode
      ? error.message
      : "Erro interno do servidor";

    return response.status(statusCode).json({ message });
  }
}
