import {z} from "zod";

export const uksMemberSchema = z.object({
  id: z.number(),
  nama: z.string().min(1, "Nama field is required"),
  jenis_kelamin: z.union([
    z.enum(["Laki-laki", "Perempuan"], {
      required_error: "Jenis Kelamin field is required"
    }),
    z.string().min(1, "Jenis Kelamin field is required")
  ]),
  nisn: z.string().min(1,"Nisn field is required").max(10, "Nisn field is too long"),
  kelas: z.string().min(1, "Kelas field is required"),
  notelp: z.string().min(1, "No. Telepon field is required").max(13, "No. Telepon is too long"),
  alamat: z.string().min(1, "Alamat field is required"),
  status_aktif: z.union([
    z.enum(["0", "1", "2"]),
    z.string()
  ]),
  ttl: z.union([
    z.date(),
    z.string().min(1, "Tempat Tanggal Lahir Field is required")
  ]),
  sebagai: z.string().min(1, "Jabatan field is required"),
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
  ttl: true,
  sebagai: true
})

export const statusSchema = z.object({
  id: z.string(),
  sebagai: z.string(),
  status_aktif: z.string()
})



export type UksMemberForm = z.infer<typeof uksMemberFormSchema>
export type UksMember = z.infer<typeof uksMemberSchema>
export type StatusUpdate = z.infer<typeof statusSchema>
