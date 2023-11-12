import {PropsWithChildren} from "react";
import NavbarHome from "@/components/home/navbar-home";
import FooterHome from "@/components/home/footer-home";

const LayoutHome = (props: PropsWithChildren) => {
  return (
    <>
      <NavbarHome/>
      {props.children}
      <FooterHome/>
    </>
  )
}

export default LayoutHome;
