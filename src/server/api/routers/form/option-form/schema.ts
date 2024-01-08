import {z} from "zod";
import {subSectionReportSchema} from "@/server/api/routers/form/sub-section-form/schema";

export const optionSchema = z.object({
  id: z.number(),
  pertanyaan: z.string(),
  subbagian_id: z.string(),
  required: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  subbagian_rapor_kesehatan: subSectionReportSchema
})

export type OptionReport = z.infer<typeof optionSchema>;
