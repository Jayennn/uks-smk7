import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {authToken, Axios} from "@/utils/axios";
import {UksMember, uksMemberFormSchema} from "@/server/api/routers/uks-member/schema";
import {z} from "zod";

const IDMember = z.object({
  id: z.number()
})

export const uksMemberRouter = createTRPCRouter({
  all: protectedProcedure
    .query(async({ctx}) => {
      const conf = authToken(ctx.token)
      const res = await Axios.get("/admin/anggota", conf)
      return res.data as {
        message: string,
        data: UksMember[]
      }
    }),
  single: protectedProcedure
    .input(IDMember)
    .query(async({ctx, input}) => {
      const conf = authToken(ctx.token)
      const res = await Axios.get(`/admin/anggota/${input.id}`, conf)

      return res.data as {
        message: string,
        data: UksMember
      }
    }),
  create: protectedProcedure
    .input(uksMemberFormSchema)
    .mutation(async ({ctx, input}) => {
      const conf = authToken(ctx.token)
      const res = await Axios.post("/admin/anggota", input, conf)

      return res.data as {
        message: string,
        data: UksMember
      }
    }),
  createInStudent: protectedProcedure
    .input(uksMemberFormSchema)
    .mutation(async ({ctx, input}) => {
      const conf = authToken(ctx.token)
      const res = await Axios.post("siswa/anggota/daftar", input, conf)
      return res.data as {
        message: string,
        data: UksMember
      }
    }),
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      data: uksMemberFormSchema
    }))
    .mutation(async({ctx, input: {id, data}}) => {
      const conf = authToken(ctx.token)
      const res = await Axios.put(`/admin/anggota/${id}`, data, conf)

      return res.data as {
        message: string,
        data: UksMember
      }
    }),
  delete: protectedProcedure
    .input(IDMember)
    .mutation(async ({ctx, input}) => {
      const conf = authToken(ctx.token)
      const res = await Axios.delete(`/admin/anggota/${input.id}`, conf)

      return res.data as {
        message: string
      }
    })
})
