import {z} from "zod";

export const uksMemberSchema = z.object({
  id: z.number(),
  nama: z.string().min(1, "The Nama field is required"),
  jenis_kelamin: z.union([
    z.enum(["Laki-laki", "Perempuan"], {
      required_error: "The Jenis Kelamin field is required"
    }),
    z.string().min(1, "The Jenis Kelamin field is required")
  ]),
  nisn: z.string().min(1,"The Nisn field is required").max(10, "The Nisn field is too long"),
  kelas: z.string().min(1, "The Kelas field is required"),
  notelp: z.string().min(1, "The No. Telepon field is required").max(13, "The No. Telepon is too long"),
  alamat: z.string().min(1, "The Alamat field is required"),
  status_aktif: z.union([
    z.enum(["0", "1", "2"]),
    z.string()
  ]),
  ttl: z.union([
    z.date(),
    z.string().min(1, "The Tempat Tanggal Lahir Field is required")
  ]),
  created_at: z.string(),
  updated_at: z.string()
})

export const uksMemberFormSchema = uksMemberSchema.pick({
  nama: true,
  nisn: true,
  kelas: true,
  notelp: true,
  alamat: true,
  jenis_kelamin: true,
  ttl: true
})



export type UksMemberForm = z.infer<typeof uksMemberFormSchema>
export type UksMember = z.infer<typeof uksMemberSchema>
