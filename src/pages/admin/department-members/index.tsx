import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement, useState} from "react";
import LayoutAdmin from "@/components/admin/layout/layout-admin";
import DataTable from "@/components/table/data-table";
import {ColumnFiltersState, getCoreRowModel, getFilteredRowModel, useReactTable} from "@tanstack/react-table";
import {trpc} from "@/utils/trpc";
import {columns} from "@/server/api/routers/uks-member/columns"
import DataTableFilter from "@/components/table/data-table-filter";
import {Button} from "@/components/ui/button";
import ModalCreateMember from "@/pages/admin/department-members/action/create";
const Page: NextPageWithLayout = () => {
  const [columnFilters, setColumnFilter] = useState<ColumnFiltersState>([])
  const [create, setCreate] = useState<boolean>(false);
  const {data: member, isLoading} = trpc.member.all.useQuery()

  const table = useReactTable({
    data: member?.anggotas ?? [],
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
      <ModalCreateMember
        open={create}
        onOpenChange={setCreate}
      />
      <div className="bg-white p-4 rounded-md shadow-md border">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Anggota UKS</h1>
            <Button
              onClick={() => setCreate(true)}
              size="sm"
            >Tambah Anggota</Button>
          </div>
          <DataTableFilter
            className="max-w-[15rem]"
            table={table}
            placeholder="Filter Name..."
            searchByColumn="nama"
          />
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
