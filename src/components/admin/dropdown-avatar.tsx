import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {LogOut} from "lucide-react";
import {trpc} from "@/utils/trpc";
import {useToast} from "@/components/ui/use-toast";
import {signOut, useSession} from "next-auth/react";
import {initialName} from "@/lib/utils";

const DropdownAvatar = () => {
  const {toast} = useToast();
  const { data: session} = useSession();

  const logout = trpc.auth.logout.useMutation({
    onSuccess: ({ message }) => {
      toast({
        title: "Success",
        description: message
      })
      localStorage.clear()
    },
    onError: ({ data, message }) => {
      toast({
        title: "Error",
        description: data?.errZod ?? message,
        variant: "destructive"

      })
    },
  })

  return (
    <>
      <DropdownMenu modal>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback className="bg-[#F9FAFB]">
              {initialName(session?.user.username ?? "")}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="font-inter w-40">
          <DropdownMenuLabel>Admin</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={async () => {
                await logout.mutateAsync();
                await signOut({ callbackUrl: "/login" });
              }}
              className="gap-4 justify-between">
              Log out
              <span>
                <LogOut size={16}/>
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}


export default DropdownAvatar;
