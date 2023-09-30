import { z } from "zod";
import { hash } from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../../repositories/user-repository";
import { ErrorHandlerHelper } from "../../helpers/error-handler-helper";
import { InputCreateUserDto, OuputCreateUserDto } from "../../dtos/user-dto";

const schema = z.object({
  name: z
    .string({ invalid_type_error: "Nome no formato inválido" })
    .nonempty({message:"Campos inválidos"})
    .min(3, "Nome precisa ter no mínimo 3 caracteres"),
  email: z
    .string({ invalid_type_error: "E-mail no formato inválido" })
    .nonempty({message:"Campos inválidos"})
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ invalid_type_error: "Senha no formato inválido" })
    .nonempty({message:"Campos inválidos"})
    .min(3, "Senha precisa ter no mínimo 3 caracteres"),
}).required();

export class CreateUserUseCase {
  async execute(input: InputCreateUserDto): Promise<OuputCreateUserDto> {
    const { name, email, password } = input;
    const validate = schema.safeParse({ name, email, password });

    if (!validate.success) {
      throw new ErrorHandlerHelper(
        StatusCodes.BAD_REQUEST,
        validate.error.errors.map(({ message }) => message).join(", ")
      );
    }

    const userRepository = new UserRepository();
    const alreadyExists = await userRepository.findByEmail({ email });

    if (alreadyExists) {
      throw new ErrorHandlerHelper(
        StatusCodes.BAD_REQUEST,
        "Usuário já existe"
      );
    }

    const passwordHash = await hash(password, 8);

    const user = await userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}
