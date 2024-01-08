import {NextPageWithLayout} from "@/pages/_app";
import * as React from "react";
import {ReactElement, useEffect, useState} from "react";
import Layout from "@/components/admin/layout/layout-admin";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {ColumnFiltersState, getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import {trpc} from "@/utils/trpc";
import {columns} from "@/server/api/routers/form/option-form/columns";
import DataTable from "@/components/table/data-table";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {CreateForm, createFormSchema} from "@/server/api/routers/form/forms/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {formatedDateAndTime} from "@/lib/utils";
const Page: NextPageWithLayout = () => {
  const [columnFilters, setColumnFilter] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const {data: option, isLoading} = trpc.form.option.all.useQuery();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm<CreateForm>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      tahun_ajaran: "",
      waktu_mulai: "",
      waktu_selesai: "",
      pertanyaan: []
    }
  })

  const table = useReactTable({
    data: option?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      columnFilters,
      rowSelection
    },
    initialState: {
      pagination: {
        pageSize: 5
      }
    }
  })

  // console.log(
  //   Object.keys(rowSelection).map((item) => Number(item))
  // )

  const ctx = trpc.useUtils() // New Version useUtils
  const createForm = trpc.form.allForm.create.useMutation({
    onSuccess: async ({message}) => {
      toast.success(message)
      await ctx.form.allForm.all.invalidate();
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })

  useEffect(() => {

    setValue("pertanyaan", table.getSelectedRowModel().rows.map((row) => row.original.id));
  }, [rowSelection]);


  const onSubmit = async(value: CreateForm) => {
    await createForm.mutateAsync({
      ...value,
      waktu_mulai: formatedDateAndTime(value.waktu_mulai),
      waktu_selesai: formatedDateAndTime(value.waktu_selesai)
    })
  }

  return (
    <>
      <div className="relative overflow-hidden flex">
        <div className="w-full bg-white p-4 rounded-md shadow-md border h-screen font-inter">
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-semibold text-[#1D2739]">Create Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="tahun-ajaran">
                    Tahun Ajaran
                  </Label>
                  <Input {...register("tahun_ajaran")} className="uppercase" placeholder="2023/202*"/>
                  <p className="text-xs text-red-500 font-medium">{errors.tahun_ajaran?.message ?? ""}</p>
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="waktu-mulai">
                    Waktu Mulai
                  </Label>
                  <Input {...register("waktu_mulai")} type="datetime-local"/>
                  <p className="text-xs text-red-500 font-medium">{errors.waktu_mulai?.message ?? ""}</p>
                </div>
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="waktu-selesai">
                    Waktu Selesai
                  </Label>
                  <Input {...register("waktu_selesai")} type="datetime-local"/>
                  <p className="text-xs text-red-500 font-medium">{errors.waktu_selesai?.message ?? ""}</p>
                </div>
              </div>
              <Separator/>
              <div className="flex flex-col gap-3 h-full">
                <h5 className="text-lg font-semibold">Structures</h5>
                <DataTable
                  isLoading={isLoading}
                  table={table}
                  colLength={columns.length}
                />
                <div className="flex justify-end items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
              <Button type="submit" size="sm">Create Form</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page;
