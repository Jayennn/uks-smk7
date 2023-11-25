import {z} from "zod"
export const sectionReportSchema = z.object({
  id: z.number(),
  label: z.string(),
  created_at: z.string(),
  updated_at: z.string()
})

export const sectionFormReportSchema = z.object({
  label: z.string().min(1, "The Label field is required")
})

export type SectionForm = z.infer<typeof sectionFormReportSchema>
export type SectionReport = z.infer<typeof  sectionReportSchema>
