import {PropsWithChildren} from "react";
import SidebarAdmin from "@/components/admin/layout/sidebar-admin";

const LayoutAdmin = (props: PropsWithChildren) => {
  return (
    <>
      <div className="flex space-x-3 min-h-screen">
        <SidebarAdmin/>
        {props.children}
      </div>
    </>
  )
}

export default LayoutAdmin;
