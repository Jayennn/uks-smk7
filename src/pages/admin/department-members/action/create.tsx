import {Controller, useForm} from "react-hook-form";
import {UksMemberForm, uksMemberFormSchema} from "@/server/api/routers/uks-member/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {DialogProps} from "@radix-ui/react-dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {trpc} from "@/utils/trpc";
import {toast} from "sonner";
import {PPLGClasses, ANIMASIClasses, DKVClasses, TJKTClasses} from "@/types/student";
import {Combobox} from "@/components/ui/combobox";
import {DatePicker} from "@/components/ui/date-picker";
import {useState} from "react";
import {Loader} from "lucide-react";
export const FormCreateMember = ({close}: {
  close: ((open: boolean) => void) | undefined
}) => {

  const [birth, setBirth] = useState<{
    place: string,
    date: Date | undefined
  }>({date: undefined, place: ""})

  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<UksMemberForm>({
    resolver: zodResolver(uksMemberFormSchema),
    defaultValues: {
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      notelp: "",
      nisn: "",
      kelas: "",
      ttl: ""
    }
  })
  const isModal = close !== undefined


  const ctx = trpc.useUtils() // New Version useUtils
  const createMember = trpc.member.create.useMutation({
    onSuccess: async ({message}) => {
      toast.success(message)
      if (isModal) {
        close(false)
      }
      await ctx.member.all.invalidate();
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })


  const onSubmit = async (data: UksMemberForm) => {
    await createMember.mutateAsync({
      ...data,
      ttl: `${birth.place}, ${birth.date}`
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nama: </Label>
            <Input id="name" {...register("nama")} placeholder="John Doe"/>
            {errors.nama?.message && <p className="text-xs font-medium text-red-500">{errors.nama?.message}</p>}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="nisn">NISN: </Label>
              <Input type="number" id="nisn" {...register("nisn")} placeholder="0068******"/>
              {errors.nisn?.message && <p className="text-xs font-medium text-red-500">{errors.nisn?.message}</p>}
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="phone-number">No. Telepon: </Label>
              <Input id="phone-number" type="number" {...register("notelp")} placeholder="0812********"/>
              {errors.notelp?.message && <p className="text-xs font-medium text-red-500">{errors.notelp?.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="address">Alamat: </Label>
            <textarea id="address" className="h-36 resize-none w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" {...register("alamat")} placeholder="Jl. Bungtomo"/>
            {errors.alamat?.message && <p className="text-xs font-medium text-red-500">{errors.alamat?.message}</p>}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="class">Kelas: </Label>
              <Controller
                render={({field}) => (
                  <>
                    <Combobox
                      className="w-full"
                      setValue={(v: string) => field.onChange(v.toUpperCase())}
                      value={field.value}
                      label={field.value ? field.value : "Pilih Kelas"}
                      placeholder="Cari Kelas..."
                      data={[...PPLGClasses, ...DKVClasses, ...TJKTClasses, ...ANIMASIClasses]}
                    />
                  </>
                )}
                name="kelas"
                control={control}
              />
              {errors.kelas?.message && <p className="text-xs font-medium text-red-500">{errors.kelas?.message}</p>}
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="identity">Jenis Kelamin: </Label>
              <Controller
                render={({field}) => (
                  <>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={field.value ? field.value : "Jenis Kelamin"}/>
                      </SelectTrigger>
                      <SelectContent className="font-poppins">
                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                )}
                name="jenis_kelamin"
                control={control}
              />
              {errors.jenis_kelamin?.message &&
                  <p className="text-xs font-medium text-red-500">{errors.jenis_kelamin?.message}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Tempat Tanggal Lahir:</Label>
            <Controller
              render={({field}) => (
                <>
                  <div className="flex items-center gap-4">
                    <Input onChange={(e) => setBirth((prev) => ({
                      ...prev,
                      place: e.target.value
                    }))} placeholder="Tempat Lahir" className="rounded-none shadow-none border-0 border-b focus-visible:ring-0"/>
                    /
                    <DatePicker
                      mode="single"
                      date={field.value as Date}
                      onSelect={(e) => {
                        field.onChange(e)
                        setBirth((prev) => ({
                          ...prev,
                          date: e
                        }))
                      }}
                    />
                  </div>
                </>
              )}
              name="ttl"
              control={control}
            />
            {errors.ttl?.message && <p className="text-xs font-medium text-red-500">{errors.ttl?.message}</p>}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            disabled={createMember.isLoading}
            variant="ghost"
            type="button"
            onClick={() => close ? close(false) : null}
          >Close</Button>
          <Button disabled={createMember.isLoading}>
            {createMember.isLoading && (
              <Loader className="mr-2 animate-spin" size={18}/>
            )}
            Tambah
          </Button>
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
