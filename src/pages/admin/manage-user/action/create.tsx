import {useForm} from "react-hook-form";
import {UserForm, userFormSchema} from "@/server/api/routers/user/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {DialogProps} from "@radix-ui/react-dialog";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {trpc} from "@/utils/trpc";
import {useToast} from "@/components/ui/use-toast";
import {Button} from "@/components/ui/button";

export const FormCreateUser = ({close}: {
  close: ((open: boolean) => void) | undefined
}) => {
  const {toast} = useToast();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const isModal = close !== undefined

  const ctx = trpc.useUtils()
  const createUser = trpc.user.create.useMutation({
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

  const onSubmit = (data: UserForm) => {
    console.log(data)
  }

  console.log(errors)

  return (
    <>
      <form className="space-y-4">
        <div className="grid gap-3">
          <div className="flex flex-col gap-2">
            <Label>Username: </Label>
            <Input {...register("username")} placeholder="username"/>
            {errors.username?.message && <p className="text-xs font-medium text-red-500">{errors.username?.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password: </Label>
            <Input {...register("password")} placeholder="password"/>
            {errors.password?.message && <p className="text-xs font-medium text-red-500">{errors.password?.message}</p>}
          </div>
          <div>
            <Label>Level: </Label>
            <Input
              {...register("level")}
              placeholder="level"
            />
            {errors.level?.message && <p className="text-xs font-medium text-red-500">{errors.level?.message}</p>}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            // disabled={createMember.isLoading}
            // onClick={() => close ? close(false) : null}
            variant="ghost"
            type="button"
          >Close</Button>
          <Button
            // disabled={createMember.isLoading}
          >
            Tambah
          </Button>
        </div>
      </form>
    </>
  )
}

const ModalCreateUser = ({...props}: DialogProps) => {
  return (
    <>
      <Dialog {...props}>
        <DialogContent className="font-inter sm:max-w-[580px]">
          <DialogHeader>
            <DialogTitle>Tambah User</DialogTitle>
            <DialogDescription>Formulir Tambah User</DialogDescription>
          </DialogHeader>
          <FormCreateUser
            close={props.onOpenChange}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalCreateUser;
