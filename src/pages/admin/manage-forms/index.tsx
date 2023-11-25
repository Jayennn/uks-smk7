import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import Layout from "@/components/admin/layout/layout-admin";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md border h-screen">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl text-[#1D2739] font-semibold">Manage Forms</h1>
          <div className="grid grid-cols-3 gap-3">
          {/*  TODO: FORM CARDS */}
          </div>
        </div>
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page;
