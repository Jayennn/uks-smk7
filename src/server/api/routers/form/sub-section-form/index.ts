import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {authToken, Axios} from "@/utils/axios";
import {subSectionFormSchema, SubSectionReport} from "@/server/api/routers/form/sub-section-form/schema";
import {z} from "zod";


const IDSubSection = z.object({
  id: z.string()
})

export const subSectionReportRouter = createTRPCRouter({
  all: protectedProcedure
    .query(async({ctx}) => {
      const conf = authToken(ctx.token)
      const res = await Axios.get("/admin/rapor/form/subbagian", conf)

      return res.data as {
        message: string,
        data: SubSectionReport[]
      }
    }),
  single: protectedProcedure
    .input(IDSubSection)
    .query(async({ctx, input}) => {
      const conf = authToken(ctx.token)
      const res = await Axios.get(`/admin/rapor/form/subbagian/${input.id}`, conf)

      return res.data as {
        message: string,
        data: SubSectionReport
      }
    }),
  create: protectedProcedure
    .input(subSectionFormSchema)
    .mutation( async({ctx, input}) => {
      const conf = authToken(ctx.token)
      const res = await Axios.post("/admin/rapor/form/subbagian", input, conf)

      return res.data as {
        message: string,
        data: SubSectionReport
      }
    }),
  delete: protectedProcedure
    .input(IDSubSection)
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token)
      const res = await Axios.delete(`/admin/rapor/form/subbagian/${input.id}`, conf)

      return res.data as {
        message: string
      }
    })
})
