import {PropsWithChildren} from "react";
import SidebarAdmin from "@/components/admin/layout/sidebar-admin";
import NavbarAdmin from "@/components/admin/layout/navbar-admin";

const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <div className="flex min-h-screen">
        <SidebarAdmin/>
        <div className="flex flex-col w-full">
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
