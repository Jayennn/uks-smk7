import {z} from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, "Tolong Masukkan Username"),
    password: z.string().min(1, "Tolong Masukkan Password")
});

export const studentSchema = z.object({
    sub: z.string(),
    id: z.string(),
    nama: z.string(),
    level_user: z.string(),
    id_siswa: z.string(),
    iat: z.number(),
    exp: z.number(),
    jti: z.string()
})

export const adminSchema = z.object({
    id: z.number(),
    username: z.string(),
    last_login: z.date(),
    created_at: z.date(),
    updated_at: z.date(),
})

export type StudentResponse = z.infer<typeof studentSchema>
export type AdminResponse = z.infer<typeof adminSchema>
export type LoginForm = z.infer<typeof loginSchema>