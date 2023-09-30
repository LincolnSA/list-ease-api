import {v4 as uuid} from 'uuid';
import { prisma } from "../prisma/prisma-client";
import { 
  InputCreateItemDto,
  InputDeleteItemDto,
  InputFindByIdItemDto,
  InputListItemDto,
  InputUpdateItemDto,
  OutputCreateItemDto,
  OutputFindByIdItemDto,
  OutputListItemDto,
  OutputUpdateItemDto
} from "../dtos/item-dot";

export class ItemRepository{
  async findById(input:InputFindByIdItemDto): Promise<OutputFindByIdItemDto | null>{
    const { id } = input;
    const response = await prisma.item.findFirst({
      where:{
        id
      }
    });

    return response;
  }

 async create(input:InputCreateItemDto): Promise<OutputCreateItemDto>{
    const { name, amount, amountType, category, userId } = input;

    const response = await prisma.item.create({
      data:{
        id:uuid(),
        name, 
        amount, 
        amount_type: amountType, 
        category,
        user_id: userId
      }
    });

    return response;
  }

  async list(input:InputListItemDto): Promise<OutputListItemDto[] | []>{
    const { userId} = input;

   const response  =  await prisma.item.findMany({
      where:{
        user_id: userId
      },
      orderBy:{
        created_at:'desc'
      }
    });

    return response;
  }

  async delete(input:InputDeleteItemDto): Promise<void>{
    const {id, userId} = input;

    await prisma.item.delete({
      where:{
        id,
        user_id: userId
      }
    });

    return;
  }

  async update(input:InputUpdateItemDto): Promise<OutputUpdateItemDto>{
    const { id, userId, name, amount, amountType, category, checked} = input;

    const response =  await prisma.item.update({
      where:{
        id,
        user_id: userId
      },
      data:{
        name, 
        amount, 
        amount_type: amountType, 
        category, 
        checked
      }
    });

    return response;
  }
}