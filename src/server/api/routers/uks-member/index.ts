import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {authToken, Axios} from "@/utils/axios";
import {UksMember} from "@/server/api/routers/uks-member/schema";
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
        anggotas: UksMember[]
      }
    }),
  single: protectedProcedure
    .input(IDMember)
    .query(async({ctx, input}) => {
      const conf = authToken(ctx.token)
      const res = await Axios.get(`admin/anggota/${input.id}`, conf)

      return res.data as {
        message: string,
        anggota: UksMember
      }

    })
})
