import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import LayoutAdmin from "@/components/admin/layout/layout-admin";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <h1>option forms</h1>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default Page;
