import {z} from "zod";

export const uksMemberSchema = z.object({
  id: z.number(),
  nama: z.string(),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"]),
  nisn: z.string(),
  kelas: z.string(),
  notelp: z.string(),
  alamat: z.string(),
  status_aktif: z.enum(["0", "1", "2"]),
  created_at: z.string(),
  updated_at: z.string()
})

export type UksMember = z.infer<typeof uksMemberSchema>
