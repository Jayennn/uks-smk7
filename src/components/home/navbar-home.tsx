import Image from "next/image";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {trpc} from "@/utils/trpc";
import {useToast} from "@/components/ui/use-toast";
import {LogOut} from "lucide-react";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {AnimatePresence, motion} from "framer-motion"
import {useRouter} from "next/router";

const NavbarHome = () => {
  const {toast} = useToast();
  const {data: session} = useSession();
  const [open, setOpen] = useState(false)
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => setOpen(false))


    if(open){
      window.document.body.style.overflow = "hidden"
    } else {
      window.document.body.style.overflow = "auto"
    }

    return () => {
      router.events.off("routeChangeComplete", () => setOpen(false))
    }

  }, [open]);

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
      <nav className="sticky top-0 z-20 h-16 bg-white shadow-md w-full">
        <div className="container py-4 lg:px-20 flex items-center justify-between">
          <Link href="/">
            <Image className="w-[11rem] h-8 md:w-[13.5rem] md:h-10" quality={100} width={250} height={250} src="/uks-logo.webp" alt="icon-uks"/>
          </Link>
       {/*   <div className="hidden md:flex text-sm items-center gap-4 font-medium">
            <Link href="/" className="flex rounded-md  items-center h-9 px-4 py-2">
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
          <button onClick={() => setOpen(!open)} className="w-[32px] h-[32px] rounded-[50%] border flex lg:hidden justify-center items-center bg-transparent">
            <div className={cn("transform-hamburger -translate-y-[3.5px] w-[14px] h-[1.5px] bg-primary absolute", open && "translate-y-0 rotate-45 scale-x-[1.1]")} data-position="top"></div>
            <div className={cn("transform-hamburger translate-y-[3.5px] w-[14px] h-[1.5px] bg-primary absolute", open && "translate-y-0 -rotate-45 scale-x-[1.1]")} data-position="bottom"></div>
          </button>*/}
        </div>

        <AnimatePresence>
          {open && (
            <>
              <motion.div
                onClick={() => setOpen(false)}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="md:hidden absolute -z-10 bg-gray-700/60 w-full h-screen"
              />
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="md:hidden z-10 absolute w-full bg-white border-t h-[10rem]"
              >
                <div className="h-full w-full container py-4 flex flex-col justify-center gap-6 font-medium text-lg">
                  <Link className="hover:text-gray-700/90" href="/">
                    Beranda
                  </Link>
                  <button className="hover:text-gray-700/90 text-left text-lg font-medium" onClick={async () => {
                    await logout.mutateAsync();
                    await signOut({ callbackUrl: "/login" });
                  }}>
                    Logout
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}

export default NavbarHome;
