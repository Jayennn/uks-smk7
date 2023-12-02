import Image from "next/image";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {trpc} from "@/utils/trpc";
import {useToast} from "@/components/ui/use-toast";
import {LogOut} from "lucide-react";

const NavbarHome = () => {
  const {toast} = useToast();
  const {data: session} = useSession();

  const logout = trpc.auth.logout.useMutation({
    onSuccess: ({ message }) => {
      toast({
        title: "Success",
        description: message
      })
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
      <nav className="sticky top-0 z-20 bg-white shadow-md w-full">
        <div className="container py-4 md:px-16 flex items-center justify-between">
          <Link href="/">
            <Image className="w-[13.5rem] h-10" quality={100} width={250} height={250} src="/uks-logo.webp" alt="icon-uks"/>
          </Link>
          <div className="hidden md:flex text-sm items-center gap-4 font-medium">
            <Link href="/" className="rounded-md flex items-center h-9 px-4 py-2">
              Beranda
            </Link>
            {session?.user ? (
              <Button className="text-sm border-green-500" size="sm" variant="outline" onClick={async () => {
                await logout.mutateAsync();
                await signOut({ callbackUrl: "/login" });
              }}>
                <LogOut size={16} className="mr-2"/>
                Logout
              </Button>
            ) : (
              <Button asChild size="sm" variant="outline" className="text-sm border-green-500">
                <Link  href="/login">
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavbarHome;
