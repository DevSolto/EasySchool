import { z } from "zod";

export const idSchema = z.string().cuid()

export type Id = z.infer<typeof idSchema>

export const querySchema = z.object({
  offset: z.string().optional().default('0'),
  limit: z.string().optional().default('10'),
  search: z.string().optional(),
  students: z.string().optional().default(''),
  teachers: z.string().optional().default(''),
  admins: z.string().optional().default(''),
});

export type Query = z.infer<typeof querySchema>