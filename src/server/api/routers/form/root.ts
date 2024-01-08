import {createTRPCRouter} from "@/server/api/trpc";
import {sectionReportRouter} from "@/server/api/routers/form/section-form";
import {subSectionReportRouter} from "@/server/api/routers/form/sub-section-form";
import {optionReportRouter} from "@/server/api/routers/form/option-form";
import {formsRouter} from "@/server/api/routers/form/forms";

export const formRouter = createTRPCRouter({
  section: sectionReportRouter,
  subsection: subSectionReportRouter,
  option: optionReportRouter,
  allForm: formsRouter
})
