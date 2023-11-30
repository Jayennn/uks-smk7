import {PropsWithChildren} from "react";
import SidebarAdmin from "@/components/admin/layout/sidebar-admin";
import NavbarAdmin from "@/components/admin/layout/navbar-admin"
import { useIsClient } from "@uidotdev/usehooks";
import {Loader} from "lucide-react";

const Layout = (props: PropsWithChildren) => {
  const isClient = useIsClient();

  if(!isClient){
    return (
      <div className="h-screen grid place-content-center">
        <p className="inline-flex items-center font-poppins text-base font-medium">
          <Loader size={18} className="mr-2 animate-spin"/>
          Loading...
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="flex min-h-screen">
        <SidebarAdmin/>
        <div className="lg:pl-[17.5rem] flex flex-col w-full">
          <NavbarAdmin/>
          <div className="h-full bg-[#F9FAFB]">
            <div className="container py-8">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout;
