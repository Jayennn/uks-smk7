import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import {authToken, Axios} from "@/utils/axios";
import {User} from "@/server/api/routers/user/schema";


export const userRouter = createTRPCRouter({
  all: protectedProcedure
    .query(async({ctx}) => {
      const conf = authToken(ctx.token);
      const res = await Axios.get("/admin/user", conf)

      return res.data as {
        users: User[],
        message: string
      }
    })
})
