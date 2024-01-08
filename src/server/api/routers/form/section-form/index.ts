import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {authToken, Axios} from "@/utils/axios";
import {sectionFormReportSchema, SectionReport} from "@/server/api/routers/form/section-form/schema";
import {z} from "zod"

const IDsectionReport = z.object({
  id: z.number()
})
export const sectionReportRouter = createTRPCRouter({
  all: protectedProcedure
    .query(async({ctx}) => {
      const conf = authToken(ctx.token)
      const res = await Axios.get("/admin/rapor/form/bagian", conf)

      return res.data as {
        message: string,
        data: SectionReport[]
      }
    }),
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      data: sectionFormReportSchema
    }))
    .mutation(async({ctx, input: {id, data}}) => {
      const conf = authToken(ctx.token)
      console.log("ini", data)
      const res = await Axios.put(`/admin/rapor/form/bagian/${id}`, data, conf)

      return res.data as {
        message: string,
        data: SectionReport
      }
    }),
  delete: protectedProcedure
    .input(IDsectionReport)
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token)
      const res = await Axios.delete(`/admin/rapor/form/bagian/${input.id}`, conf)

      return res.data as {
        message: string
      }
    })
})
