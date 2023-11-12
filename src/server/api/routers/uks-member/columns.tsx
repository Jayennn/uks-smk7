import {CellContext, ColumnDef} from "@tanstack/react-table";
import {UksMember} from "@/server/api/routers/uks-member/schema";
import {Badge} from "@/components/ui/badge";
import {dated} from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {trpc} from "@/utils/trpc";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Loader, MoreVertical} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import {atom, useAtom} from "jotai";
import {Skeleton} from "@/components/ui/skeleton";
import {ModalUpdateMember} from "@/pages/admin-uks/uks-member/[member_id]/update";
import {useState} from "react";


const openDetail = atom(false)
const IDMemberAtom = atom<number | undefined>(undefined)

interface DialogProps {
  onOpenChange: () => void
  open: boolean
  id: number
}

const RenderDetailMember = () => {
  return (
    <>
          <DialogHeader>
            <DialogTitle>
              <Skeleton className="h-5 w-[190px]"/>
            </DialogTitle>
            <DialogDescription>
              Detail Anggota UKS-SMKN7
            </DialogDescription>
          </DialogHeader>
            <div className="pt-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="nama">Nama: </Label>
                <Skeleton className="h-9 w-full"/>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="nama">NISN: </Label>
                <Skeleton className="h-9 w-full"/>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="nama">Alamat: </Label>
                <Skeleton className="h-9 w-full"/>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="nama">No. Telepon: </Label>
                <Skeleton className="h-9 w-full"/>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nama">Kelas: </Label>
                  <Skeleton className="h-9 w-full"/>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nama">Jenis Kelamin: </Label>
                  <Skeleton className="h-9 w-full"/>
                </div>
              </div>
            </div>

    </>
  )
}

const DataDetailMember = ({ data }: {
  data: {
    message: string,
    anggota: UksMember
  }
}) => {
  return (
    <>
        <DialogHeader>
          <DialogTitle>{data.anggota.nama}</DialogTitle>
          <DialogDescription>
            Detail Anggota UKS-SMKN7
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nama">Nama: </Label>
            <Input className="disabled:font-medium" disabled value={data.anggota.nama}/>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="nama">NISN: </Label>
            <Input className="disabled:font-medium" disabled value={data.anggota.nisn}/>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="nama">Alamat: </Label>
            <Input className="disabled:font-medium" disabled value={data.anggota.alamat}/>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="nama">No. Telepon: </Label>
            <Input className="disabled:font-medium" disabled value={data.anggota.notelp}/>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="nama">Kelas: </Label>
              <Input className="disabled:font-medium" disabled value={data.anggota.kelas}/>
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="nama">Jenis Kelamin: </Label>
              <Input className="disabled:font-medium" disabled value={data.anggota.jenis_kelamin}/>
            </div>
          </div>
        </div>
    </>
  )
}

const ModalDetailMember = ({open, onOpenChange, id}: DialogProps) => {
  const { data } = trpc.member.single.useQuery({
    id
  })

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="font-inter sm:max-w-[580px]">
          {!data?.anggota ? (
            <RenderDetailMember/>
          ) : (
            <DataDetailMember
              data={data}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

const Action = ({row}: CellContext<UksMember, unknown>) => {
  const { toast } = useToast();
  const {id} = row.original;
  const ctx = trpc.useContext();
  const [openCreateDialog, setOpenCreateDialog] = useAtom(openDetail)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [idMember, setIdMember] = useAtom(IDMemberAtom)


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
      {idMember && (
        <ModalDetailMember
          id={idMember}
          open={openCreateDialog}
          onOpenChange={() =>{
           setOpenCreateDialog(false)
           setIdMember(undefined)
          }}
        />
      )}
      {idMember && (
      <ModalUpdateMember
        id={idMember}
        open={openUpdateDialog}
        onOpenChange={() => {
          setOpenUpdateDialog(false)
          setIdMember(undefined)
        }}
      />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          {deleteMember.isLoading ?
            <Loader  size={18} className="animate-spin"/>
            :
            <MoreVertical size={18}/>
          }
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-inter" align="end">
          <DropdownMenuLabel>Table Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {
              setOpenCreateDialog(true)
              setIdMember(id)
            }}>
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async() => {
              await deleteMember.mutateAsync({id})
            }}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              setOpenUpdateDialog(true)
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
