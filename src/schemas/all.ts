import { z } from "zod";

export const idSchema = z.string().cuid()

export type Id = z.infer<typeof idSchema>