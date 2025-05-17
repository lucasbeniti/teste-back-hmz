import jwt from 'jsonwebtoken';
import { IUserLoginRequest } from "../interfaces/User";
import { UserRepository } from "../repositories/userRepository";

export class LoginService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(credentials: IUserLoginRequest) {
    const user = await this.userRepository.validateCredentials(credentials.email, credentials.password);

    if (!user) {
      throw new Error("Credenciais inválidas")
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "chave",
      { expiresIn: '1d'}
    )

    return { token, user };
  }
}