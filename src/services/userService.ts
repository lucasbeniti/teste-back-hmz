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

  async update(id: number, data: IUser) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    if (data.email) {
      const userAlreadyExists = await this.userRepository.findByEmail(data.email);
      
      if (userAlreadyExists && userAlreadyExists.id !== id) {
        throw new Error("Esse e-mail já está sendo utilizado em outro usuário")
      }
    }

    return this.userRepository.update(id, data);
  }

  async getPaginated(page: number, perPage: number) {
    return this.userRepository.getPaginated(page, perPage);
  }
}