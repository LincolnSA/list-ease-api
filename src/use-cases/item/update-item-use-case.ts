import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { ItemRepository } from "../../repositories/item-repository";
import { ErrorHandlerHelper } from "../../helpers/error-handler-helper";
import { InputUpdateItemDto, OutputUpdateItemDto } from "../../dtos/item-dot";

const schema = z.object({
  name: z.string({ invalid_type_error:"Campo inválido" }).nonempty({ message:"Campo não pode ser vazio" }),
  amount: z.string({ invalid_type_error:"Campo inválido" }).nonempty({ message:"Campo não pode ser vazio" }).min(1),
  checked: z.boolean({ invalid_type_error:"Campo inválido" }),
  amountType: z
    .union([ z.literal("und"), z.literal("l"), z.literal("kg")])
    .or(z.string().refine((value) => false, { message: "Prioridade no formato inválido" })),
  category: z
    .union([ z.literal("Padaria"), z.literal("Legume"), z.literal("Carne"), z.literal("Fruta"), z.literal("Bebida")])
    .or(z.string().refine((value) => false, { message: "Prioridade no formato inválido" })),
}).required();

export class UpdateItemUseCase {
  async execute(input: InputUpdateItemDto): Promise<OutputUpdateItemDto> {
    const { id, userId, name, amount,checked, amountType, category } = input;
    const validate = schema.safeParse({ name, amount, checked, amountType, category });

    if (!validate.success) {
      throw new ErrorHandlerHelper(
        StatusCodes.BAD_REQUEST,
        validate.error.errors.map(({ message }) => message).join(", ")
      );
    }

    const itemRepository = new ItemRepository();
    const updatedItem = await itemRepository.update({ id, userId, name, amount,checked, amountType, category });

    return updatedItem;
  }
}
