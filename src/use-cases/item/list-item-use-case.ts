import { ItemRepository } from "../../repositories/item-repository";
import {  InputListItemDto, OutputListItemDto } from "../../dtos/item-dot";
 
export class ListItemUseCase {
  async execute(input: InputListItemDto): Promise<OutputListItemDto[] | []> {
    const { userId } = input;
    
    const itemRepository = new ItemRepository();
    const items =  await itemRepository.list({  userId });

    return items;
  }
}
