import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import LayoutAdmin from "@/components/admin/layout/layout-admin";

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
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default Page;
