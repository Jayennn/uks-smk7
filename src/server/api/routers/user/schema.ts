import {z} from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  level: z.number(),
  last_login: z.string(),
  created_at: z.string(),
  updated_at: z.string()
})

export const userFormSchema = z.object({
  username: z.string().min(1, "The Username field is required"),
  password: z.string().min(1, "The Password field is required"),
  level: z.union([
    z.string().min(1, "The Level field is required"),
    z.number()
  ]),
})

export type UserForm = z.infer<typeof userFormSchema>
export type User = z.infer<typeof userSchema>
