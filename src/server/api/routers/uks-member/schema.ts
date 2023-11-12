import {z} from "zod";

export const uksMemberSchema = z.object({
  id: z.number(),
  nama: z.string().min(1, "The Nama field is required"),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"]),
  nisn: z.string().min(1, "The Nisn field is required"),
  kelas: z.string().min(1, "The Kelas field is required"),
  notelp: z.string().min(1, "The No. Telepon field is required"),
  alamat: z.string().min(1, "The Alamat field is required"),
  status_aktif: z.enum(["0", "1", "2"]),
  created_at: z.string(),
  updated_at: z.string()
})

export const uksMemberFormSchema = uksMemberSchema.pick({
  nama: true,
  nisn: true,
  kelas: true,
  notelp: true,
  alamat: true
}).extend({
  jenis_kelamin: z.string().min(1, "The Jenis Kelamin field is required")
})


export type UksMemberForm = z.infer<typeof uksMemberFormSchema>
export type UksMember = z.infer<typeof uksMemberSchema>
