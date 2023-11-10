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
  DialogTrigger
} from "@/components/ui/dialog";
import {trpc} from "@/utils/trpc";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";



export const DetailMember = ({row} : CellContext<UksMember, unknown>) => {


  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Badge>Detail</Badge>
        </DialogTrigger>
        <DialogContent className="font-inter">
          <DialogHeader>
            <DialogTitle>{row.original.nama}</DialogTitle>
            <DialogDescription>
              Detail Anggota UKS-SMKN7
            </DialogDescription>
            <div className="pt-4 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="nama">Nama: </Label>
                <Input className="disabled:font-semibold" disabled value={row.original.nama}/>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
    header: "Nisn"
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
    header: "Detail Anggota",
    cell: DetailMember
  },
  {
    accessorKey: "status_aktif",
    header: "Status",
    cell: ({row}) => {
      const {status_aktif} = row.original;
      console.log(status_aktif)
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
  }
]
