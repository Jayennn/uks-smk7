import {createTRPCRouter} from "@/server/api/trpc";
import {sectionReportRouter} from "@/server/api/routers/form/section-form";

export const formRouter = createTRPCRouter({
  section: sectionReportRouter
})
