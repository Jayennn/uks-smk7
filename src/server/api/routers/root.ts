
import {createTRPCRouter} from "@/server/api/trpc";
import {authRouter} from "@/server/api/routers/auth";
import {userRouter} from "@/server/api/routers/user";
import {uksMemberRouter} from "@/server/api/routers/uks-member";
export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  member: uksMemberRouter
})

export type AppRouter = typeof appRouter;
