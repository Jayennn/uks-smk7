import {createTRPCRouter} from "@/server/api/trpc";
import {sectionReportRouter} from "@/server/api/routers/form/section-form";
import {subSectionReportRouter} from "@/server/api/routers/form/sub-section-form";

export const formRouter = createTRPCRouter({
  section: sectionReportRouter,
  subsection: subSectionReportRouter,
})
