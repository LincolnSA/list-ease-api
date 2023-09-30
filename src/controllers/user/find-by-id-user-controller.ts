import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FindByIdUserUseCase } from "../../use-cases/user/find-by-id-user-use-case";

export class FindByIdUserController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const findByIdUserUseCase = new FindByIdUserUseCase();

    const user = await findByIdUserUseCase.execute({ id: userId });

    return response.status(StatusCodes.OK).json({
      message: "Dados do usuário",
      data: user,
    });
  }
}
