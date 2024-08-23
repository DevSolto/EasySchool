export class UserAlreadyExistsError extends Error {
  constructor(cpf: string) {
    super(`User with CPF ${cpf} is already registered.`);
    this.name = "UserAlreadyExistsError";
  }
}