import { prisma } from "../lib/prisma";
import { CreateUserParams } from "../schemas/users";

export async function createUserModel(data: CreateUserParams, salt: string) {
  return await prisma.user.create({
    data: {
      salt,
      ...data
    }
  })
}
export async function getUserByIdModel(id: string) {
  return await prisma.user.findUnique({
    where: {
      id
    }
  })
}
export async function getUserByCpfModel(cpf: string) {
  return await prisma.user.findUnique({
    where: {
      cpf
    }
  })
}

