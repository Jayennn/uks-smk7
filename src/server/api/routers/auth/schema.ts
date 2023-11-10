import {z} from "zod";


export const loginSchema = z.object({
  username: z.string().min(1, "Tolong Masukkan Username"),
  password: z.string().min(1, "Tolong Masukkan Password")
});

export type LoginForm = z.infer<typeof loginSchema>
