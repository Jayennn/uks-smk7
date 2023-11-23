import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import Layout from "@/components/admin/layout/layout-admin";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <div>
        <h1 className="text-lg font-semibold">Hello world</h1>
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page;
