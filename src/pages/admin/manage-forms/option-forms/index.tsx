import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import LayoutAdmin from "@/components/admin/layout/layout-admin";
import DataTable from "@/components/table/data-table";
import {trpc} from "@/utils/trpc";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {columns} from "@/server/api/routers/form/option-form/columns";

const Page: NextPageWithLayout = () => {
  const {data: option, isLoading} = trpc.form.option.all.useQuery()

  const table = useReactTable({
    data: option?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  
  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md border">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl text-[#1D2739] font-semibold">Pertanyaan Form UKS</h1>
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

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default Page;
