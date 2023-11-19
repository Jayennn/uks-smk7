import Image from "next/image";
import Link from "next/link";
import {useSession} from "next-auth/react";

const NavbarHome = () => {
  const {data: session} = useSession();
  return (
    <>
      <nav className="sticky top-0 z-20 bg-white shadow-md w-full">
        <div className="container py-4 md:px-16 flex items-center justify-between">
            <Image className="w-[13.5rem] h-10" quality={100} width={250} height={250} src="/uks-logo.png" alt="icon-uks"/>
          <div className="hidden md:flex items-center gap-4 font-medium">
            <Link href="/" className="rounded-md flex items-center h-9 px-4 py-2">
              Beranda
            </Link>
            {session?.user ? (
              <p>{session.user.nama ?? session.user.username}</p>
            ) : (
              <Link  href="/login" className="rounded-md flex items-center h-9 px-4 py-2 border-[2px] border-[#00CC52]">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavbarHome;
