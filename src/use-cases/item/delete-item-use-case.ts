import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../../repositories/user-repository";
import { ItemRepository } from "../../repositories/item-repository";
import { ErrorHandlerHelper } from "../../helpers/error-handler-helper";
import { InputDeleteItemDto } from "../../dtos/item-dot";
 
export class DeleteItemUseCase {
  async execute(input: InputDeleteItemDto): Promise<void> {
    const { id, userId } = input;

    const userRepository = new UserRepository();
    const itemRepository = new ItemRepository();

    const user = await userRepository.findById({ id: userId });
    const item = await itemRepository.findById({ id });

    if (!user || !item) {
      throw new ErrorHandlerHelper(
        StatusCodes.BAD_REQUEST,
        "Dados inválidos"
      );
    }

    await itemRepository.delete({ id, userId });

    return;
  }
}
