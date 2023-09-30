import { z } from "zod";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../../repositories/user-repository";
import { ErrorHandlerHelper } from "../../helpers/error-handler-helper";
import { InputAuthDto, OutpuAuthDto } from "../../dtos/auth-dto";

const schema = z.object({
  email: z
    .string({ invalid_type_error: "E-mail no formato inválido" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ invalid_type_error: "Senha no formato inválido" })
    .min(3, "Senha precisa ter no mínimo 3 caracteres"),
});

export class AuthUseCase {
  async execute(input: InputAuthDto): Promise<OutpuAuthDto> {
    const { email, password } = input;
    const validate = schema.safeParse({  email,  password });

    if (!validate.success) {
      throw new ErrorHandlerHelper(
        StatusCodes.BAD_REQUEST,
        validate.error.errors.map(({ message }) => message).join(", ")
      );
    }

    const userRepository = new UserRepository();
    const user = await userRepository.findByEmail({ email });

    if (!user) {
      throw new ErrorHandlerHelper(
        StatusCodes.BAD_REQUEST,
        "Email/Senha inválidos"
      );
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new ErrorHandlerHelper(
        StatusCodes.BAD_REQUEST,
        "Email/Senha inválidos"
      );
    }

    const keySecretToken = process.env.TOKEN_KEY_SECRET;
    const expiresIn = process.env.TOKEN_EXPIRES_IN;

    const token = sign({ email: user.email }, keySecretToken, {
      subject: user.id,
      expiresIn,
    });

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
