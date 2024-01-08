import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {authToken, Axios} from "@/utils/axios";
import {createFormSchema, Form, FormStructure} from "@/server/api/routers/form/forms/schema";


export const formsRouter = createTRPCRouter({
  all: protectedProcedure
    .query(async({ctx}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.get("/admin/rapor/form/list", conf);

      return res.data as {
        message: string,
        data: Form[]
      }
    }),
  create: protectedProcedure
    .input(createFormSchema)
    .mutation(async({ctx, input}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.post("/admin/rapor/form/list", input, conf);

      return res.data as {
        message: string,
        form: {
          tahun_ajaran: string,
          waktu_mulai: string,
          waktu_selesai: string,
          updated_at: string,
          created_at: string,
          id: number,
          detail: Array<{
            pertanyaan_id: number,
            form_id: number,
            updated_at: string,
            created_at: string,
            id: number;
          }>
        }
      }
    })
  ,
  structure: protectedProcedure
    .query(async({ctx}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.get("/admin/rapor/structure", conf);

      return res.data as {
        message: string,
        data: FormStructure[]
      }
    })
})
