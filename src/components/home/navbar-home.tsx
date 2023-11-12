import Image from "next/image";
import Link from "next/link";

const NavbarHome = () => {
  return (
    <>
      <nav className="absolute top-0 z-20 bg-transparent w-full">
        <div className="container py-4 px-16 flex items-center justify-between">
            <Image width={250} height={250} src="/uks-icon.svg" alt="icon-uks"/>
          <div className="flex items-center text-white gap-4 text-sm font-semibold">
            <Link href="#" className="rounded-md flex items-center h-9 px-4 py-2">
              Beranda
            </Link>
            <Link  href="/login" className="rounded-md flex items-center h-9 px-4 py-2 border-[2px] border-[#00CC52]">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavbarHome;
