import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Controller, useForm} from "react-hook-form";
import {UksMember, UksMemberForm, uksMemberSchema} from "@/server/api/routers/uks-member/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Axios} from "@/utils/axios";
import {useSession} from "next-auth/react";
import {DialogProps} from "@radix-ui/react-dialog";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {trpc} from "@/utils/trpc";
import {toast} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";
import {Loader, Pencil} from "lucide-react";
import {Combobox} from "@/components/ui/combobox";
import {ANIMASIClasses, DKVClasses, PPLGClasses, TJKTClasses} from "@/types/student";
import {DatePicker} from "@/components/ui/date-picker";
import {format} from "date-fns";
import {useState} from "react";

interface UpdateMemberProps {
  id: number
  close: ((open: boolean) => void) | undefined
}

const FormUpdateMember = ({id, close}: UpdateMemberProps) => {
  const { data: session } = useSession()
  const [birth, setBirth] = useState<{
    place: string | undefined,
    date: Date | undefined
  }>({date: undefined, place: undefined})
  const ctx = trpc.useUtils() // New Version useUtils

  const {
    register,
    getValues,
    handleSubmit,
    control,
    formState: { errors,  }
  } = useForm<UksMember>({
    resolver: zodResolver(uksMemberSchema),
    defaultValues: async() => {
      const res = await Axios.get(`/admin/anggota/${id}`, {
        headers: {Authorization: `Bearer ${session?.user.token ?? ""}`},
      })

      const { data } = res.data as {
        message: string,
        data: UksMember
      }

      return data
    }
  })


  const isModal = close !== undefined

  const updateMember = trpc.member.update.useMutation({
    onSuccess: async({message}) => {
      toast.success(message)
      await ctx.member.all.invalidate();
      if (isModal) {
        close(false)
      }
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })


  const onSubmit = async(data: UksMemberForm) => {
    // TODO: Make Function Date Conversion
    const birthOfDate = data.ttl.toString().split(' ');
    const date = birthOfDate[birthOfDate.length - 1]
    const place = birthOfDate.slice(0, birthOfDate.length - 1).join(' ').replace(/,([^,]*)$/, '.$1')

    await updateMember.mutateAsync({
      id: id,
      data: {
        ...data,
        ttl: `${birth.place ?? place}, ${birth.date ?? date}`
      }
    })
  }

  console.log(errors)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-3">
          <div className="flex flex-col gap-2">
            <Label>Nama: </Label>
            {!getValues("nama") ? (
              <Skeleton className="h-9 w-full"/>
            ) : (
              <Input {...register("nama")} placeholder="John Doe"/>
            )}
            {errors.nama?.message && <p className="text-xs font-medium text-red-500">{errors.nama?.message}</p>}
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2 flex flex-col gap-2">
              <Label>No. Telepon: </Label>
              {!getValues("notelp") ? (
                <Skeleton className="h-9 w-full"/>
              ) : (
                <Input {...register("notelp")} placeholder="0812********"/>
              )}
              {errors.notelp?.message && <p className="text-xs font-medium text-red-500">{errors.notelp?.message}</p>}
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label>NISN: </Label>
              {!getValues("nisn") ? (
                <Skeleton className="h-9 w-full"/>
              ) : (
                <Input {...register("nisn")} placeholder="0068******"/>
              )}
              {errors.nisn?.message && <p className="text-xs font-medium text-red-500">{errors.nisn?.message}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Alamat: </Label>
            {!getValues("alamat") ? (
              <Skeleton className="h-9 w-full"/>
            ) : (
              <textarea
                className="h-36 resize-none w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                {...register("alamat")}
                placeholder="Jl. Bungtomo"
              />
            )}
            {errors.alamat?.message && <p className="text-xs font-medium text-red-500">{errors.alamat?.message}</p>}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2 flex flex-col gap-2">
              <Label>Kelas: </Label>
              {!getValues("kelas") ? (
                <Skeleton className="h-9 w-full"/>
              ) : (
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
              )}
              {errors.kelas?.message && <p className="text-xs font-medium text-red-500">{errors.kelas?.message}</p>}
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label>Jenis Kelamin: </Label>
              {!getValues("jenis_kelamin")? (
                <Skeleton className="h-9 w-full"/>
              ) : (
                <Controller
                  render={({field}) => (
                    <Select value={field.value} onValueChange={(value: string) => field.onChange(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Jenis Kelamin"/>
                      </SelectTrigger>
                      <SelectContent className="font-inter">
                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  name="jenis_kelamin"
                  control={control}
                />
              )}
              {errors.jenis_kelamin?.message && <p className="text-xs font-medium text-red-500">{errors.jenis_kelamin?.message}</p>}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Tempat Tanggal Lahir: </Label>
          {getValues("ttl") === undefined ? (
            <div className="flex gap-4">
              <Skeleton className="h-9 w-full"/>
              <Skeleton className="h-9 w-full"/>
            </div>
          ) : (
            <Controller
              render={({field}) => {
                const birthOfDate = field.value?.toString().split(/, /)
                const date = birthOfDate[birthOfDate?.length - 1]
                const place = birthOfDate?.slice(0, birthOfDate.length - 1).join(' ').replace(/,([^,]*)$/, '.$1')

                return (
                  <div className="flex items-center gap-4">
                    <Input
                      value={birth.place ?? place}
                      onChange={(e) => {
                        setBirth((prev) => ({
                          ...prev,
                          place: e.target.value ?? place
                        }))
                      }}
                      placeholder="Tempat Lahir"
                      className="rounded-none shadow-none border-0 border-b focus-visible:ring-0"
                    />
                    /
                    <DatePicker
                      mode="single"
                      date={birth.date ?? new Date(date)}
                      onSelect={(e) => {

                        setBirth((prev) => ({
                          ...prev,
                          date: e
                        }))
                      }}
                    />

                  </div>
                )
              }}
              name="ttl"
              control={control}
            />
          )}
          {errors.ttl?.message && <p className="text-xs font-medium text-red-500">{errors.ttl?.message}</p>}
        </div>
          <div className="flex justify-end gap-2">
            <Button
              disabled={updateMember.isLoading}
              variant="ghost"
              type="button"
              onClick={() => close ? close(false) : null}
            >Close</Button>
            <Button disabled={updateMember.isLoading}>
              {updateMember.isLoading ? (
                <>
                  <Loader size={18} className="mr-2 animate-spin"/>
                  Loading
                </>
              ): (
                <>
                  <Pencil size={18} className="mr-2"/>
                  Edit
                </>
              )}
            </Button>
          </div>
      </form>
    </>
  )
}

const ModalUpdateMember = ({...props}: DialogProps & {
  id: number
}) => {
  return (
    <>
      <Dialog {...props}>
        <DialogContent className="font-inter sm:max-w-[580px]">
          <DialogHeader>
            <DialogTitle>Update Anggota</DialogTitle>
            <DialogDescription>
              Formulir Update Anggota UKS
            </DialogDescription>
          </DialogHeader>
          <FormUpdateMember
            close={props.onOpenChange}
            id={props.id}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalUpdateMember;
