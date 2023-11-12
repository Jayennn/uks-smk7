import {NextPageWithLayout} from "@/pages/_app";
import LayoutHome from "@/components/home/layout/layout-home";
import {ReactElement} from "react";
import Image from "next/image";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <section className="relative h-screen">
        <Image fill={true} className="object-cover" src="/banner.svg" alt="banner-uks"/>
      </section>
      <section className="h-screen">
        <div className="h-full container px-16 flex items-center justify-between">
          <div className="flex flex-col justify-center max-w-md">
            <div className="grid gap-3">
              <h1 className="text-4xl font-bold">Rapor Kesehatanku</h1>
              <p className="text-sm font-semibold">buku catatan kesehatan tingkat SMP/MTS dan SMK/MA</p>
            </div>

            <button className="mt-8 bg-[#00CC52] text-white px-4 py-1.5 w-fit text-sm rounded-md">Login untuk mengisi</button>
          </div>
          <div
            style={{
              backgroundImage: `url(/green_bg.svg)`,
              width: "100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center"
            }}
            className=" mt-auto mx-auto max-w-sm h-full flex justify-center items-center">
            <div className="relative mx-auto">
              <Image
                quality={100}
                width={250}
                height={250}
                className="object-contain"
                src="/rapor-kesehatan.png"
                alt="rapor-kesehatan"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement){
  return <LayoutHome>{page}</LayoutHome>
}

export default Page;
