import {PropsWithChildren} from "react";
import NavbarHome from "@/components/home/navbar-home";

const LayoutHome = (props: PropsWithChildren) => {
  return (
    <>
      <NavbarHome/>
      {props.children}
    </>
  )
}

export default LayoutHome;
