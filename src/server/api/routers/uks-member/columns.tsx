import {CellContext, ColumnDef} from "@tanstack/react-table";
import {UksMember} from "@/server/api/routers/uks-member/schema";
import {Badge} from "@/components/ui/badge";
import {dated} from "@/lib/utils";
import {trpc} from "@/utils/trpc";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Loader, MoreHorizontal} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import {useState} from "react";
import ModalDeleteMember from "@/pages/admin/department-members/action/delete";
import ModalUpdateMember from "@/pages/admin/department-members/action/update";
import ModalDetailMember from "@/pages/admin/department-members/action/detail";



const Action = ({row}: CellContext<UksMember, unknown>) => {
  const { toast } = useToast();
  const {id} = row.original;
  const ctx = trpc.useUtils();
  const [openDialog, setOpenDialog] = useState({
    delete: false,
    update: false,
    detail: false
  })
  const [idMember, setIdMember] = useState<number | undefined>(undefined)


  const deleteMember = trpc.member.delete.useMutation({
    onSuccess: async({message}) => {
      toast({
        title: "Success",
        description: message
      })
      await ctx.member.all.invalidate()
    },
    onError: ({data, message}) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: data?.errZod ?? message
      })
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
        <DropdownMenuContent className="font-inter" align="end">
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
    accessorKey: "status_aktif",
    header: "Status",
    cell: ({row}) => {
      const {status_aktif} = row.original;
      if(status_aktif === "0") {
        return <Badge variant="outline">Menunggu</Badge>
      } else if(status_aktif === "1"){
        return <Badge variant="destructive">Tolak</Badge>
      } else if(status_aktif === "2"){
        return <Badge variant="secondary">terima</Badge>
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
