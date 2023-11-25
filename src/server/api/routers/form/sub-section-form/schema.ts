import {z} from "zod"
export const subSectionReportSchema = z.object({
  id: z.number(),
  label: z.string(),
  bagian_id: z.string(),
  created_at: z.string(),
  updated_at: z.string()
})

export const subSectionFormSchema = z.object({
  label: z.string().min(1, "The label field is required."),
  bagian_id: z.string().min(1, "The bagian id field is required.")
})

export type SubSectionForm = z.infer<typeof subSectionReportSchema>
export type SubSectionReport = z.infer<typeof subSectionReportSchema>
