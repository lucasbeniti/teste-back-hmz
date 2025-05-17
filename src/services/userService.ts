import { IUser } from "../interfaces/User";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  }

  async create(data: IUser) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);
    
    if (userAlreadyExists) {
      throw new Error("Esse e-mail já está sendo utilizado em outro usuário");
    }

    return this.userRepository.create(data);
  }

  async delete(id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return this.userRepository.delete(id);
  }
}