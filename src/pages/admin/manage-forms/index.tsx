import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import LayoutAdmin from "@/components/admin/layout/layout-admin";
import {trpc} from "@/utils/trpc";
import {badgeVariants} from "@/components/ui/badge";
import {Skeleton} from "@/components/ui/skeleton";
import {datedDay} from "@/lib/utils";
import {FilePlus2} from "lucide-react";
import Link from "next/link";

const Page: NextPageWithLayout = () => {

  const {data: forms } = trpc.form.allForm.all.useQuery();

  return (
   <>
    <div className="min-h-screen bg-white p-4 rounded-md shadow-md border">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold text-[#1D2739]">Form UKS</h1>

        <div className="grid grid-cols-3 gap-4">
          <Link href="/admin/manage-forms/create-form" className="grid place-content-center min-h-[11rem] border rounded-md shadow text-gray-500">
            <div className="flex flex-col gap-2 items-center justify-between">
              <FilePlus2 />
              <p className="text-center font-medium text-sm">Add Form</p>
            </div>
          </Link>
          {!forms?.data ? (
            <>
              {Array.from({length: 3}).map((data, index) => (
                <Skeleton key={index} className="p-4 min-h-[11rem] border rounded-md shadow-md">
                  <div className="flex items-center justify-between">
                    <Skeleton className="font-medium text-sm max-w-[10rem] truncate"></Skeleton>
                    <Skeleton></Skeleton>
                  </div>
                </Skeleton>
              ))}
            </>
          ) : (
            <>
              {forms.data.map((form) => (
                <div key={form.id} className="flex flex-col p-3 min-h-[11rem] border rounded-md shadow">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm max-w-[10rem] truncate">{form.judul_form}</p>

                    {form.status_buka === "0" && (
                      <p className={badgeVariants({variant: "destructive"})}>Draft</p>
                    )}
                    {form.status_buka === "1" && (
                      <p className={badgeVariants({variant: "outline"})}>Buka</p>
                    )}
                  </div>
                  <div>

                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="font-medium text-xs text-gray-500">{datedDay(form.waktu_mulai)} - {datedDay(form.waktu_selesai)}</p>
                    <p className="font-medium text-xs text-gray-500">{form.tahun_ajaran}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
   </>
  )
}

Page.getLayout = function getLayout(page: ReactElement){
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default Page;
