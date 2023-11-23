import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {SectionForm, SectionReport, sectionReportSchema} from "@/server/api/routers/form/section-form/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Axios} from "@/utils/axios";
import {useSession} from "next-auth/react";
import {DialogProps} from "@radix-ui/react-dialog";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Loader, Pencil} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import {trpc} from "@/utils/trpc";
import {useToast} from "@/components/ui/use-toast";

interface UpdateSectionProps {
  id: number,
  close: ((open: boolean) => void) | undefined
}

const FormUpdateSection = ({id, close}: UpdateSectionProps) => {
  const {toast} = useToast();
  const { data: session } = useSession()
  const ctx = trpc.useUtils() // New Version useUtils

  const {
    register,
    handleSubmit,
    getValues,
    formState: {errors}
  } = useForm<SectionReport>({
    resolver: zodResolver(sectionReportSchema),
    defaultValues: async() => {
      const res = await Axios.get(`/admin/rapor/form/bagian/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.token ?? ""}`
        }

      })
      const {bagian} = res.data as {
        message: string,
        bagian: SectionReport
      }

      return bagian
    }
  })

  const isModal = close !== undefined

  const updateSection = trpc.form.section.update.useMutation({
    onSuccess: async({message}) => {
      toast({
        title: "Message",
        description: message
      })
      await ctx.form.section.all.invalidate();
      if (isModal) {
        close(false)
      }
    },
    onError: ({data, message}) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: data?.errZod ?? message
      })
    }
  })


  const onSubmit = async(data: SectionForm) => {
    await updateSection.mutateAsync({
      id: id,
      data: data
    })
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label>Bagian: </Label>
          {!getValues("label") ? (
            <Skeleton className="h-9 w-full"/>
          ) : (
            <Input {...register("label")} placeholder="	Pemeriksaan Berdasarkan Kuesioner"/>
          )}
          {errors.label?.message && <p className="text-xs font-medium text-red-500">{errors.label?.message}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            disabled={updateSection.isLoading}
            variant="ghost"
            type="button"
            onClick={() => close ? close(false) : null}
          >
            Close
          </Button>
          <Button disabled={updateSection.isLoading}>
            {updateSection.isLoading ? (
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

const ModalUpdateSection = ({...props}: DialogProps & {
  id: number
}) => {
  return (
    <>
      <Dialog {...props}>
        <DialogContent className="font-inter sm:max-w-[580px]">
          <DialogHeader>
            <DialogTitle>Update Bagian</DialogTitle>
            <DialogDescription>
              Formulir Update Bagian Form UKS
            </DialogDescription>
          </DialogHeader>
          <FormUpdateSection
            close={props.onOpenChange}
            id={props.id}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalUpdateSection;
