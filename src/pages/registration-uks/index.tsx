import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement, useEffect, useState} from "react";
import LayoutHome from "@/components/home/layout/layout-home";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Loader, Send} from "lucide-react";
import {Controller, useForm} from "react-hook-form";
import {UksMemberForm, uksMemberFormSchema} from "@/server/api/routers/uks-member/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {trpc} from "@/utils/trpc";
import {toast} from "sonner";
import {useSession} from "next-auth/react";
import {Combobox} from "@/components/ui/combobox";
import {ANIMASIClasses, DKVClasses, PPLGClasses, TJKTClasses} from "@/types/student";
import {DatePicker} from "@/components/ui/date-picker";
import {format} from "date-fns";

const Page: NextPageWithLayout = () => {
  const {data: session} = useSession();
  const [birth, setBirth] = useState<{
    place: string,
    date: Date | undefined
  }>({
    date: undefined,
    place: ""
  })

  const {
    register  ,
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm<UksMemberForm>({
    resolver: zodResolver(uksMemberFormSchema),
    defaultValues: {
      nama: "",
      nisn: "",
      alamat: "",
      jenis_kelamin: "",
      notelp: "",
      kelas: "",
      ttl: ""
    }
  })

  useEffect(() => {
    reset({
      nama: session?.user.nama ?? "",
      nisn: session?.user.username ?? ""
    })
  }, [session]);

  const ctx = trpc.useUtils();
  const createMember = trpc.member.createInStudent.useMutation({
    onSuccess: async ({message}) => {
      toast.success(message)
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
      <section className="py-28">
        <div className="container max-w-5xl space-y-8">
          <h1 className="text-center text-4xl md:leading-[2.5rem] text-[#1D2739] font-bold">Pendaftaran Anggota UKS</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 border rounded-md shadow-md px-4 py-10 md:px-8 md:py-12">
            <div className="grid gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nama: </Label>
                <Input
                  {...register("nama")}
                  id="name"
                  placeholder="John Doe"

                />
                {errors.nama?.message && <p className="text-xs font-medium text-red-500">{errors.nama?.message}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-2 flex flex-col gap-2">
                  <Label htmlFor="nisn">NISN: </Label>
                  <Input
                    {...register("nisn")}
                    id="nisn"
                    placeholder="0068******"

                  />
                  {errors.nisn?.message && <p className="text-xs font-medium text-red-500">{errors.nisn?.message}</p>}
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <Label htmlFor="no-telepon">No. Telepon / HP: </Label>
                  <Input {...register("notelp")} type="number" id="no-telepon" className="appearance-none"  placeholder="0812********"/>
                  {errors.notelp?.message && <p className="text-xs font-medium text-red-500">{errors.notelp?.message}</p>}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="alamat">Alamat: </Label>
                <textarea {...register("alamat")} className="flex h-36 resize-none w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="alamat"  placeholder="Jl. Bungtomo"/>
                {errors.alamat?.message && <p className="text-xs font-medium text-red-500">{errors.alamat?.message}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-2 flex flex-col gap-2">
                  <Label htmlFor="kelas">Kelas: </Label>
                  <Controller
                    render={({field}) => (
                      <Combobox
                        className="w-full font-normal"
                        setValue={(v: string) => field.onChange(v.toUpperCase())}
                        value={field.value}
                        label={field.value ? field.value : "Pilih Kelas"}
                        placeholder="Cari Kelas..."
                        data={[...PPLGClasses, ...DKVClasses, ...TJKTClasses, ...ANIMASIClasses]}
                      />
                    )}
                    name="kelas"
                    control={control}
                  />

                  {errors.kelas?.message && <p className="text-xs font-medium text-red-500">{errors.kelas?.message}</p>}
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <Label htmlFor="jenis-kelamin">
                    Jenis Kelamin:
                  </Label>
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
                        {errors.jenis_kelamin?.message && <p className="text-xs font-medium text-red-500">{errors.jenis_kelamin?.message}</p>}
                      </>
                    )}
                    name="jenis_kelamin"
                    control={control}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Tempat Tanggal Lahir:</Label>
                <div className="flex items-center gap-4">
                  <Input onChange={(e) => setBirth((prev) => ({
                    ...prev,
                    place: e.target.value
                  }))} className="rounded-none shadow-none border-0 border-b focus-visible:ring-0" placeholder="Tempat Lahir"/>
                  /
                  <Controller
                    render={({field}) => (
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
                    )}
                    control={control}
                    name="ttl"
                  />
                </div>
                {errors.ttl?.message && <p className="text-xs font-medium text-red-500">{errors.ttl?.message}</p>}
              </div>
            </div>
            <Button disabled={createMember.isLoading} className="ml-auto">
              {createMember.isLoading ? (
                <Loader className="mr-2 animate-spin" size={18}/>
                ) : (
                <Send className="mr-2" size={18}/>
              )}
              Send
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}


Page.getLayout = function getLayout(page: ReactElement){
  return <LayoutHome>{page}</LayoutHome>
}

export default Page
