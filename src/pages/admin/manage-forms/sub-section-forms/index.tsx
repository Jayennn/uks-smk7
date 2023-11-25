import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import LayoutAdmin from "@/components/admin/layout/layout-admin";
import {trpc} from "@/utils/trpc";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {columns} from "@/server/api/routers/form/sub-section-form/columns";
import DataTable from "@/components/table/data-table";

const Page: NextPageWithLayout = () => {

  const {data: subSection, isLoading} = trpc.form.subsection.all.useQuery()

  const table = useReactTable({
    data: subSection?.subbagians ?? [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md border">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl text-[#1D2739] font-semibold">Sub-Bagian Form UKS</h1>
          <DataTable
            table={table}
            isLoading={isLoading}
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
