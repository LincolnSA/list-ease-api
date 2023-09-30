import { v4 as uuid } from "uuid";
import { prisma } from "../prisma/prisma-client";
import {
  InputCreateUserDto,
  InputFindByEmailDto,
  InputFindByIdDto,
  OuputCreateUserDto,
  OutpuFindByEmailDto,
  OutputFindByIdDto,
} from "../dtos/user-dto";

export class UserRepository {
  async findById(input: InputFindByIdDto): Promise<OutputFindByIdDto | null> {
    const { id } = input;

    const response = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        created_at: true,
      },
    });

    return response;
  }

  async findByEmail(
    input: InputFindByEmailDto
  ): Promise<OutpuFindByEmailDto | null> {
    const { email } = input;

    const response = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        created_at: true,
      },
    });

    return response;
  }

  async create(input: InputCreateUserDto): Promise<OuputCreateUserDto> {
    const { email, name, password } = input;

    const response = await prisma.user.create({
      data: {
        id: uuid(),
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: false,
        password: false,
      },
    });

    return response;
  }
}
