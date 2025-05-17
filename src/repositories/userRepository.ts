import bcrypt from 'bcrypt';
import { PrismaClient } from "../../generated/prisma";
import { IUser } from "../interfaces/User";

const prisma = new PrismaClient();

export class UserRepository{
  async findById(id: number) {
    return prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async create(data: IUser) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword
      }
    })
  }

  async delete(id: number) {
    return prisma.user.delete({
      where: {
        id
      }
    })
  }

  async update(id: number, userData: IUser) {
    const data: any = {
      name: userData.name,
      email: userData.email
    };

    if (userData.password) {
      data.password = await bcrypt.hash(userData.password, 10);
    }

    return prisma.user.update({
      where: {
        id
      },
      data
    })
  }
}