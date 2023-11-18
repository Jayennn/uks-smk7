import {useForm} from "react-hook-form";
import {UksMemberForm, uksMemberFormSchema} from "@/server/api/routers/uks-member/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {DialogProps} from "@radix-ui/react-dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {trpc} from "@/utils/trpc";
import {useToast} from "@/components/ui/use-toast";

export const FormCreateMember = ({close}: {
  close: ((open: boolean) => void) | undefined
}) => {
  const {toast} = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<UksMemberForm>({
    resolver: zodResolver(uksMemberFormSchema),
    defaultValues: {
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      notelp: "",
      nisn: "",
      kelas: ""
    }
  })
  const isModal = close !== undefined

  const ctx = trpc.useContext() // New Version useUtils
  const create_member = trpc.member.create.useMutation({
    onSuccess: async ({message}) => {
      toast({
        title: "Message",
        description: message
      })
      if (isModal) {
        close(false)
      }
      await ctx.member.all.invalidate();
    },
    onError: ({data, message}) => {

      toast({
        title: "Error",
        variant: "destructive",
        // @ts-ignore
        description: data?.errZod ?? message
      })
    }
  })


  const onSubmit = async (data: UksMemberForm) => {
    await create_member.mutateAsync(data)
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-3">
          <div className="flex flex-col gap-2">
            <Label>Nama: </Label>
            <Input {...register("nama")} placeholder="John Doe"/>
            {errors.nama?.message && <p className="text-xs font-medium text-red-500">{errors.nama?.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label>NISN: </Label>
            <Input {...register("nisn")} placeholder="0068******"/>
            {errors.nisn?.message && <p className="text-xs font-medium text-red-500">{errors.nisn?.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Alamat: </Label>
            <Input {...register("alamat")} placeholder="Jl. Bungtomo"/>
            {errors.alamat?.message && <p className="text-xs font-medium text-red-500">{errors.alamat?.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label>No. Telepon: </Label>
            <Input type="number" {...register("notelp")} placeholder="0812********"/>
            {errors.notelp?.message && <p className="text-xs font-medium text-red-500">{errors.notelp?.message}</p>}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2 flex flex-col gap-2">
              <Label>Kelas: </Label>
              <Input {...register("kelas")} placeholder="XII PPLG 1"/>
              {errors.kelas?.message && <p className="text-xs font-medium text-red-500">{errors.kelas?.message}</p>}
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label>Jenis Kelamin: </Label>
              <Select onValueChange={(value: string) => setValue("jenis_kelamin", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Jenis Kelamin"/>
                </SelectTrigger>
                <SelectContent className="font-inter">
                  <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
              {errors.jenis_kelamin?.message &&
                  <p className="text-xs font-medium text-red-500">{errors.jenis_kelamin?.message}</p>}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            disabled={create_member.isLoading}
            variant="ghost"
            type="button"
            onClick={() => close ? close(false) : null}
          >Close</Button>
          <Button disabled={create_member.isLoading}>Tambah</Button>
        </div>
      </form>
    </>
  )
}

const ModalCreateMember = ({...props}: DialogProps) => {
  return (
    <>
      <Dialog {...props}>
        <DialogContent className="font-inter sm:max-w-[580px]">
          <DialogHeader>
            <DialogTitle>Tambah Anggota</DialogTitle>
            <DialogDescription>Formulir Tambah Anggota UKS</DialogDescription>
          </DialogHeader>
          <FormCreateMember
            close={props.onOpenChange}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalCreateMember;
