import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import LayoutAdmin from "@/components/admin/layout/layout-admin";
import DataTable from "@/components/table/data-table";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {trpc} from "@/utils/trpc";
import {columns} from "@/server/api/routers/uks-member/columns";
import DataTableFilter from "@/components/table/data-table-filter";
import {Button} from "@/components/ui/button";

const Page: NextPageWithLayout = () => {

  const {data: member, isLoading} = trpc.member.all.useQuery()

  const table = useReactTable({
    data: member?.anggotas ?? [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md border">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Anggota UKS</h1>
            <Button size="sm">Tambah Anggota</Button>
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
