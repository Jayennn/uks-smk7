import {CellContext, ColumnDef} from "@tanstack/react-table";
import {UksMember} from "@/server/api/routers/departement-members/schema";
import {dated} from "@/lib/utils";
import {trpc} from "@/utils/trpc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuPortal,
  DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Loader, MoreHorizontal} from "lucide-react";
import {toast} from "sonner";
import {useState} from "react";
import ModalDeleteMember from "@/pages/admin/department-members/action/delete";
import ModalUpdateMember from "@/pages/admin/department-members/action/update";
import ModalDetailMember from "@/pages/admin/department-members/action/detail";
import Switch from "@/components/Switch";



const Action = ({row}: CellContext<UksMember, unknown>) => {
  const {id, status_aktif, sebagai} = row.original;
  const ctx = trpc.useUtils();
  const [openDialog, setOpenDialog] = useState({
    delete: false,
    update: false,
    detail: false
  })
  const [idMember, setIdMember] = useState<number | undefined>(undefined)


  const deleteMember = trpc.member.delete.useMutation({
    onSuccess: async({message}) => {
      toast.success(message)
      await ctx.member.all.invalidate()
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })


  const updateStatus = trpc.member.statusUpdate.useMutation({
    onSuccess: async({message}) => {
      toast.success(message)
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })

  return (
    <>
      <ModalDeleteMember
        open={openDialog.delete}
        onOpenChange={() => {
          setOpenDialog((prev) => ({
            ...prev,
            delete: false
          }))
          setIdMember(undefined)
        }}
        onClick={async() => {
          await deleteMember.mutateAsync({ id })
        }}
      />
      {idMember && (
        <ModalDetailMember
          id={idMember}
          open={openDialog.detail}
          onOpenChange={() =>{
            setOpenDialog((prev) => ({
              ...prev,
              detail: false
            }))
           setIdMember(undefined)
          }}
        />
      )}
      {idMember && (
      <ModalUpdateMember
        id={idMember}
        open={openDialog.update}
        onOpenChange={() => {
          setOpenDialog((prev) => ({
            ...prev,
            update: false
          }))
          setIdMember(undefined)
        }}
      />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          {deleteMember.isLoading ?
            <Loader  size={18} className="animate-spin"/>
            :
            <MoreHorizontal size={18}/>
          }
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-inter text-sm w-40" align="end">
          <DropdownMenuLabel>Table Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {
              setOpenDialog((prev) => ({
                ...prev,
                detail: true
              }))
              setIdMember(id)
            }}>
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              setOpenDialog((prev) => ({
                ...prev,
                delete: true
              }))
            }}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              setOpenDialog((prev) => ({
                ...prev,
                update: true
              }))
              setIdMember(id)
            }}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {status_aktif === "0" && (
                    <>
                      <DropdownMenuItem onClick={async() => {
                        await updateStatus.mutateAsync({
                          id: id.toString(),
                          sebagai,
                          status_aktif: "2"
                        })
                      }}>Terima</DropdownMenuItem>
                      <DropdownMenuItem onClick={async() => {
                        await updateStatus.mutateAsync({
                          id: id.toString(),
                          sebagai,
                          status_aktif: "1"
                        })
                      }}>Tolak</DropdownMenuItem>
                    </>
                  )}
                  {status_aktif === "1" && (
                    <DropdownMenuItem onClick={async() => {
                      await updateStatus.mutateAsync({
                        id: id.toString(),
                        sebagai,
                        status_aktif: "2"
                      })
                    }}>Terima</DropdownMenuItem>
                  )}
                  {status_aktif === "2" && (
                    <DropdownMenuItem onClick={async() => {
                      await updateStatus.mutateAsync({
                        id: id.toString(),
                        sebagai,
                        status_aktif: "1"
                      })
                    }}>Tolak</DropdownMenuItem>
                  )}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
export const columns: ColumnDef<UksMember>[] = [
  {
    header: "No",
    cell: ({row}) => row.index + 1
  },
  {
    accessorKey: "nisn",
    header: "NISN"
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "kelas",
    header: "Kelas"
  },
  {
    accessorKey: "sebagai",
    header: "Divisi",
    cell: ({row}) => {
      const {sebagai} = row.original
      if(sebagai === "1"){
        return "PMR"
      }

      if(sebagai === "2"){
        return "KKR"
      }

      if(sebagai === "3"){
        return "PMR dan KKR"
      }

      return sebagai ?? "Belum Terisi"
    }
  },
  {
    accessorKey: "status_aktif",
    header: "Status",
    cell: ({row}) => {
      const {status_aktif} = row.original;

      if(status_aktif === "0"){
        return "Menunggu"
      }

      if(status_aktif === "1"){
        return "Ditolak"
      }

      if(status_aktif === "2"){
        return "Diterima"
      }

    }
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({row}) => dated(row.original.created_at)
  },
  {
    id: "Action",
    cell: Action
  }
]
