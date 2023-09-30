import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ListItemUseCase } from "../../use-cases/item/list-item-use-case";

export class ListItemController {
  async handle(request: Request, response: Response) {
    const userId = request.userId;

    const listItemUseCase = new ListItemUseCase();
    const items = await listItemUseCase.execute({ userId });

    return response.status(StatusCodes.OK).json({
      message: "Lista de itens",
      data: items,
    });
  }
}
