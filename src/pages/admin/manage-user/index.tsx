import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement, useState} from "react";
import LayoutAdmin from "@/components/admin/layout/layout-admin";
import DataTable from "@/components/table/data-table";
import {trpc} from "@/utils/trpc";
import {ColumnFiltersState, getCoreRowModel, getFilteredRowModel, useReactTable} from "@tanstack/react-table";
import {columns} from "@/server/api/routers/user/columns";
import DataTableFilter from "@/components/table/data-table-filter";
const Page: NextPageWithLayout = () => {
  const [columnFilters, setColumnFilter] = useState<ColumnFiltersState>([])

  const {data: user, isLoading} = trpc.user.all.useQuery()

  const table = useReactTable({
    data: user?.users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    }
  })


  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md border">
        <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Manage User</h1>
              <DataTableFilter
                className="max-w-[15rem]"
                table={table}
                placeholder="Filter Name..."
                searchByColumn="username"
              />
            </div>
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
