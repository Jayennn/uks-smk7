import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {authToken, Axios} from "@/utils/axios";
import {OptionReport} from "@/server/api/routers/form/option-form/schema";


export const optionReportRouter = createTRPCRouter({
  all: protectedProcedure
    .query(async({ctx}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.get("/admin/rapor/form/pertanyaan", conf)
      
      return res.data as {
        message: string,
        data: OptionReport[]
      }
    })
})
