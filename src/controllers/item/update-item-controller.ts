import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UpdateItemUseCase } from "../../use-cases/item/update-item-use-case";
import { socketServer } from "../../server";

export class UpdateItemController {
  async handle(request: Request, response: Response) {
    const { name, amount, amountType, category, checked } = request.body;
    const id = request.params.id;
    const  userId  = request.userId;

    const updateItemUseCase = new UpdateItemUseCase();
    const updatedItem = await updateItemUseCase.execute({
      id,
      userId,
      name,
      checked,
      amount,
      amountType,
      category,
    });

    socketServer.emit("update-list", { userId });

    return response.status(StatusCodes.OK).json({
      message: "Item alterado com sucesso",
      data: updatedItem,
    });
  }
}
