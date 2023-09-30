import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateUserUseCase } from "../../use-cases/user/create-user-use-case";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    return response.status(StatusCodes.CREATED).json({
      message: "Usuário criado com sucesso",
      data: user,
    });
  }
}
