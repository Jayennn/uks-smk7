import {z} from "zod";
import {sectionReportSchema} from "@/server/api/routers/form/section-form/schema";

export const formSchema = z.object({
  id: z.number(),
  judul_form: z.string(),
  status_buka: z.string(),
  tahun_ajaran: z.string(),
  waktu_mulai: z.string(),
  waktu_selesai: z.string(),
  created_at: z.string(),
  updated_at: z.string()
})


const pertanyaanStructureSchema = z.object({
  id: z.number(),
  pertanyaan: z.string(),
  subbagian_id: z.string(),
  required: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  pertanyaan_detail_rapor_kesehatan: z.array(
    z.object({
      id: z.number(),
      pertanyaan_id: z.string(),
      opsi_id: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      opsi_rapor_kesehatan: z.object({
        id: z.number(),
        label: z.string(),
        type: z.string(),
        created_at: z.string(),
        updated_at: z.string(),
      })
    })
  )
})

const subbagianStructureSchema = z.object({
  id: z.number(),
  label: z.string(),
  bagian_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  pertanyaan_rapor_kesehatan: z.array(pertanyaanStructureSchema)
})

export const formStructureSchema = z.object({
  id: z.number(),
  label: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  subbagian_rapor_kesehatan: z.array(subbagianStructureSchema)
})

export const createFormSchema = z.object({
  tahun_ajaran: z.string().min(1, "Tahun ajaran field is required."),
  waktu_mulai: z.string().min(1, "Waktu mulai field is required."),
  waktu_selesai: z.string().min(1, "Waktu selesai field is required."),
  pertanyaan: z.array(z.number())
})

export type CreateForm = z.infer<typeof createFormSchema>;
export type Form = z.infer<typeof formSchema>;
export type FormStructure = z.infer<typeof formStructureSchema>;
