import {createTRPCRouter, protectedProcedure, publicProcedure} from "@/server/api/trpc";
import {loginSchema} from "@/server/api/routers/auth/schema";
import {authToken, Axios} from "@/utils/axios";

export const authRouter = createTRPCRouter({
    login: publicProcedure
      .input(loginSchema)
      .mutation(async({input}) => {
          const res = await Axios.post("/auth/login", input)
          console.log(res.data)
      }),
    logout: protectedProcedure
      .mutation(async({ctx}) => {
          const conf = authToken(ctx.token)
          const res = await Axios.post("/auth/logout", undefined, conf)
          return res.data as {
            message: string
          }
      })
})
