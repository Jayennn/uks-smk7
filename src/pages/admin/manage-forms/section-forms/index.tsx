import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import LayoutAdmin from "@/components/admin/layout/layout-admin";
import DataTable from "@/components/table/data-table";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {trpc} from "@/utils/trpc";
import {columns} from "@/server/api/routers/form/section-form/columns";

const Page: NextPageWithLayout = () => {

  const {data: section, isLoading} = trpc.form.section.all.useQuery()

  const table = useReactTable({
    data: section?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md border">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl text-[#1D2739] font-semibold">Bagian Form UKS</h1>
          <DataTable
            isLoading={isLoading}
            table={table}
            colLength={columns.length}
          />
        </div>
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement){
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default Page;
