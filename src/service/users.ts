import { CreateUserParams } from "../schemas/users";
import { UserAlreadyExistsError } from '../error/users'
import { createUserModel, getUserByCpfModel, getUserByIdModel } from "../model/users";
import bcrypt from 'bcrypt';
import { Id } from "../schemas/all";

export async function createUserService(data: CreateUserParams) {
  const userWithSameCpf = await getUserByCpfModel(data.cpf)

  if (userWithSameCpf) {
    throw new UserAlreadyExistsError(data.cpf)
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(data.password, salt)

  return await createUserModel({ ...data, password: hashedPassword }, salt)
}

export async function getUserByIdService(id: Id) {
  return await getUserByIdModel(id)

}