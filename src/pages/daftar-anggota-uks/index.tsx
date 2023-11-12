import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
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
import {useToast} from "@/components/ui/use-toast";

const Page: NextPageWithLayout = () => {
  const {toast} = useToast();
  const {
    register  ,handleSubmit,
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
      kelas: ""
    }
  })

  const ctx = trpc.useUtils();
  const create_member = trpc.member.createInStudent.useMutation({
    onSuccess: async ({message}) => {
      toast({
        title: "Message",
        description: message
      })
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
      <section className="py-28">
        <div className="container max-w-5xl space-y-8">
          <h1 className="text-center text-4xl md:leading-[2.5rem] text-[#1D2739] font-bold">Pendaftaran Anggota UKS</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 border rounded-md shadow-md px-8 py-12">
            <div className="grid gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nama: </Label>
                <Input {...register("nama")} id="name" placeholder="John Doe"/>
                {errors.nama?.message && <p className="text-xs font-medium text-red-500">{errors.nama?.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="nisn">NISN: </Label>
                <Input {...register("nisn")} id="nisn" placeholder="0068******"/>
                {errors.nisn?.message && <p className="text-xs font-medium text-red-500">{errors.nisn?.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="alamat">Alamat: </Label>
                <textarea {...register("alamat")} className="flex h-36 resize-none w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="alamat"  placeholder="Jl. Bungtomo"/>
                {errors.alamat?.message && <p className="text-xs font-medium text-red-500">{errors.alamat?.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="no-telepon">No. Telepon / HP: </Label>
                <Input {...register("notelp")} type="number" id="no-telepon" className="appearance-none"  placeholder="0812********"/>
                {errors.notelp?.message && <p className="text-xs font-medium text-red-500">{errors.notelp?.message}</p>}
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-2 flex flex-col gap-2">
                  <Label htmlFor="kelas">Kelas: </Label>
                  <Input {...register("kelas")} id="kelas" placeholder="XII PPLG 1"/>
                  {errors.kelas?.message && <p className="text-xs font-medium text-red-500">{errors.kelas?.message}</p>}
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <Label htmlFor="jenis-kelamin">
                    Jenis Kelamin:
                  </Label>
                  <Controller
                    render={({field}) => (
                      <>
                        <Select onValueChange={(value: string) => field.onChange(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Jenis Kelamin"/>
                          </SelectTrigger>
                          <SelectContent className="font-poppins">
                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.jenis_kelamin?.message &&
                            <p className="text-xs font-medium text-red-500">{errors.jenis_kelamin?.message}</p>}
                      </>
                    )}
                    name="jenis_kelamin"
                    control={control}
                  />
                </div>
              </div>
            </div>
            <Button disabled={create_member.isLoading} className="ml-auto">
              {create_member.isLoading ? (
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
