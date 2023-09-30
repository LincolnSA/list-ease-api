import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DeleteItemUseCase } from "../../use-cases/item/delete-item-use-case";
import { socketServer } from "../../server";

export class DeleteItemController {
  async handle(request: Request, response: Response) {
    const id = request.params.id;
    const userId = request.userId;

    const deleteItemUseCase = new DeleteItemUseCase();
    const deletedItem = await deleteItemUseCase.execute({
      id,
      userId
    });

    socketServer.emit("update-list", { userId });

    return response.status(StatusCodes.NO_CONTENT).json({
      message: "Item deletado com sucesso",
      data: deletedItem,
    });
  }
}
