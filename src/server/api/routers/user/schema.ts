import {z} from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  level: z.number(),
  last_login: z.string(),
  created_at: z.string(),
  updated_at: z.string()
})

export type User = z.infer<typeof userSchema>
