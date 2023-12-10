import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement, useMemo, useState} from "react";
import LayoutAdmin from "@/components/admin/layout/layout-admin";
import DataTable from "@/components/table/data-table";
import {
  PaginationState,
  getPaginationRowModel,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from "@tanstack/react-table";
import {trpc} from "@/utils/trpc";
import {columns} from "@/server/api/routers/uks-member/columns"
import DataTableFilter from "@/components/table/data-table-filter";
import {Button} from "@/components/ui/button";
import ModalCreateMember from "@/pages/admin/department-members/action/create";
import {Popover} from "@/components/ui/popover";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {PaginationItems} from "@/types/pagination";
import {Loader} from "lucide-react";
const Page: NextPageWithLayout = () => {
  const [columnFilters, setColumnFilter] = useState<ColumnFiltersState>([])
  const [{pageIndex, pageSize}, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5
  })
  const [create, setCreate] = useState<boolean>(false);
  const {data: member, isLoading} = trpc.member.all.useQuery()

  const pagination = useMemo(() => ({
    pageIndex,
    pageSize
  }), [pageIndex, pageSize])

  const table = useReactTable({
    data: member?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      columnFilters,
      pagination
    },

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
            <h1 className="text-2xl text-[#1D2739] font-semibold">Anggota UKS</h1>
            <Button
              onClick={() => setCreate(true)}
              size="sm"
            >Tambah Anggota</Button>
          </div>
          <div>
            <DataTableFilter
              className="max-w-[15rem]"
              table={table}
              placeholder="Filter Name..."
              searchByColumn="nama"
            />
          </div>
          <DataTable
            isLoading={isLoading}
            table={table}
            colLength={columns.length}
          />
          <div className="flex items-center justify-between">
            <div className="flex justify-end items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
            {isLoading ? (
              <Loader size={15} className="animate-spin"/>
            ) : (
              <span className="flex items-center text-sm gap-2">
                <p>{table.getState().pagination.pageIndex + 1}</p>
                of {' '}
                <p>{table.getPageCount()}</p>
              </span>
            )}
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Show: </p>
              <Select
                value={table.getState().pagination.pageSize.toString()}
                onValueChange={(v) => table.setPageSize(Number(v))}
              >
                <SelectTrigger className="w-[60px]">
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent align="end">
                  {PaginationItems.map((item) => (
                    <SelectItem key={item.label} value={item.value.toString()}>{item.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default Page;
