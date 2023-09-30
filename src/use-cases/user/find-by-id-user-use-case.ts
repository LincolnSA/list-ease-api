import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../../repositories/user-repository";
import { ErrorHandlerHelper } from "../../helpers/error-handler-helper";
import { InputFindByIdDto, OutputFindByIdDto } from "../../dtos/user-dto";

export class FindByIdUserUseCase {
  async execute(input: InputFindByIdDto): Promise<OutputFindByIdDto> {
    const { id } = input;

    const userRepository = new UserRepository();
    const user = await userRepository.findById({ id });

    if (!user) {
      throw new ErrorHandlerHelper(
        StatusCodes.BAD_REQUEST,
        "Usuário inexistente"
      );
    }

    return user;
  }
}
