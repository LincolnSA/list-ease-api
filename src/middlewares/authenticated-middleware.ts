import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../repositories/user-repository";
import { ErrorHandlerHelper } from "../helpers/error-handler-helper";
import { PayloadDto } from "../dtos/auth-dto";

export class AuthenticatedMiddleware {
  async handle(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
      throw new ErrorHandlerHelper(StatusCodes.UNAUTHORIZED, "Não autorizado");
    }

    const [, token] = authToken.split(" ");

    if (!token) {
      throw new ErrorHandlerHelper(StatusCodes.UNAUTHORIZED, "Não autorizado");
    }

    try {
      const keySecretToken = process.env.TOKEN_KEY_SECRET;
      const { sub } = verify(token, keySecretToken) as PayloadDto;

      const userRepository = new UserRepository();
      const user = await userRepository.findById({
        id: sub,
      });

      if (!user) {
        throw new ErrorHandlerHelper(
          StatusCodes.UNAUTHORIZED,
          "Não autorizado"
        );
      }

      request.userId = sub;

      return next();
    } catch (error) {
      throw new ErrorHandlerHelper(StatusCodes.UNAUTHORIZED, "Não autorizado");
    }
  }
}
