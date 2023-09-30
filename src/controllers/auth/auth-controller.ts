import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthUseCase } from "../../use-cases/auth/auth-use-case";

export class AuthController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authUseCase = new AuthUseCase();

    const authenticated = await authUseCase.execute({
      email,
      password,
    });

    return response.status(StatusCodes.CREATED).json({
      message: "Usuário autenticado",
      data: authenticated,
    });
  }
}
