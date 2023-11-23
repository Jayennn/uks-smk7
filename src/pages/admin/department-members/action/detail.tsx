import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Skeleton} from "@/components/ui/skeleton";
import {Label} from "@/components/ui/label";
import {UksMember} from "@/server/api/routers/uks-member/schema";
import {Input} from "@/components/ui/input";
import {trpc} from "@/utils/trpc";

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
          <Label htmlFor="nisn">NISN: </Label>
          <Skeleton className="h-9 w-full"/>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="alamat">Alamat: </Label>
          <Skeleton className="h-9 w-full"/>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="no-telepon">No. Telepon: </Label>
          <Skeleton className="h-9 w-full"/>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="kelas">Kelas: </Label>
            <Skeleton className="h-9 w-full"/>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="jenis-kelamin">Jenis Kelamin: </Label>
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


export default ModalDetailMember;
