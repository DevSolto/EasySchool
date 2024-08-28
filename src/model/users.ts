import { Role } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { Query } from "../schemas/all";
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
export async function getUsersModel(query: Query) {

  const roles: Role[] = [
    Boolean(query.admins) && Role.ADMIN,
    Boolean(query.teachers) && Role.TEACHER,
    Boolean(query.students) && Role.STUDENT,
  ].filter((role): role is Role => Boolean(role));

  return await prisma.user.findMany({
    where: {
      name: {
        contains: query.search,
        mode: "insensitive",
      },
      role: roles.length > 0 ? { in: roles } : undefined,
    },
    skip: Number(query.offset),
    take: Number(query.limit),
  });
}

export async function getTotalUsersModel() {
  return await prisma.user.count()
}
