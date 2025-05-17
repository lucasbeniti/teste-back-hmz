import bcrypt from 'bcrypt';
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});

  const password = await bcrypt.hash('123', 10);

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@exemplo.com',
      password: password
    }
  });

  console.log("Usuário criado com sucesso através do seed!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})