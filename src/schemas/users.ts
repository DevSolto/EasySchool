import { z } from 'zod';

// Definição do schema de validação para novos usuários
export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  cpf: z.string().min(11, "CPF must have at least 11 characters"),
  avatarUrl: z.string().optional(),
  role: z.enum(["STUDENT", "TEACHER", "ADMIN"]).default("STUDENT"),
  password: z.string().min(6, "Password must be at least 6 characters long")
});

export type CreateUserParams = z.infer<typeof createUserSchema>