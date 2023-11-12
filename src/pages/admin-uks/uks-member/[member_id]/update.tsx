import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {UksMember, UksMemberForm, uksMemberSchema} from "@/server/api/routers/uks-member/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Axios} from "@/utils/axios";
import {useSession} from "next-auth/react";
import {DialogProps} from "@radix-ui/react-dialog";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {trpc} from "@/utils/trpc";
import {useToast} from "@/components/ui/use-toast";
import {NextPageWithLayout} from "@/pages/_app";
import Head from "next/head";
import {ReactElement} from "react";
import LayoutAdmin from "@/components/admin/layout/layout-admin";

interface UpdateMemberProps {
  id: number
}

const FormUpdateMember = ({id}: UpdateMemberProps) => {
  const {toast} = useToast();
  const { data: session } = useSession()
  const ctx = trpc.useUtils() // New Version useUtils

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<UksMember>({
    resolver: zodResolver(uksMemberSchema),
    defaultValues: async() => {
      const res = await Axios.get(`/admin/anggota/${id}`, {
        headers: {Authorization: `Bearer ${session?.user.token ?? ""}`},
      })
      const { anggota } = res.data as {
        message: string,
        anggota: UksMember
      }

      return anggota
    }
  })

  const updateMember = trpc.member.update.useMutation({
    onSuccess: async({message}) => {
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
        description: data?.errZod ?? message
      })
    }
  })

  const onSubmit = async(data: UksMemberForm) => {
    await updateMember.mutateAsync({
      id: id,
      data: data
    })
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
            <Input {...register("notelp")} placeholder="0812********"/>
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
              <Select value={watch("jenis_kelamin")} onValueChange={(value: any) => setValue("jenis_kelamin", value)}>
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
        <div className="flex justify-between gap-2">
          <Button disabled={updateMember.isLoading} type="submit">
            Edit
          </Button>
        </div>
      </form>
    </>
  )
}

export const ModalUpdateMember = ({...props}: DialogProps & {
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
            id={props.id}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Member - UKS</title>
      </Head>
      <h1>Tes</h1>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default Page;
