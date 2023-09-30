import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateItemUseCase } from "../../use-cases/item/create-item-use-case";
import { socketServer } from "../../server";

export class CreateItemController {
  async handle(request: Request, response: Response) {
    const { name, amount, amountType, category } = request.body;
    const  userId  = request.userId;

    const createItemUseCase = new CreateItemUseCase();
    const newItem = await createItemUseCase.execute({
      name,
      amount,
      amountType,
      category,
      userId
    });

    socketServer.emit("update-list", { userId });

    return response.status(StatusCodes.CREATED).json({
      message: "Item criado com sucesso",
      data: newItem,
    });
  }
}
