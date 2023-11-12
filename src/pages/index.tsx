import {NextPageWithLayout} from "@/pages/_app";
import LayoutHome from "@/components/home/layout/layout-home";
import {ReactElement} from "react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ClipboardList, KeyRound} from "lucide-react";
import {useSession} from "next-auth/react";
const Page: NextPageWithLayout = () => {
  const {data: session} = useSession();
  return (
    <>
      <section className="container relative flex items-center max-h-full h-[42rem]">
        <div className="max-w-xl relative flex flex-col">
          <h1 className="text-5xl font-bold text-[#1D2739] md:leading-[3.5rem]">
            Usaha Kesehatan Sekolah{" "}
            <span className="text-green-500">
              SMK NEGERI 7
            </span>
            {" "}
            Samarinda
          </h1>
          <div className="mt-8 flex items-center justify-evenly gap-3">
            <Image
              width={100}
              height={100}
              src="/assets/logo/smk7-logo.png"
              alt="logo SMK 7 Samarinda"
            />
            <Image
              width={100}
              height={100}
              src="/assets/logo/dinas-kesehatan-logo.png"
              alt="logo dinas kesehatan Samarinda"
            />
            <Image
              width={100}
              height={100}
              src="/assets/logo/uks-logo.png"
              alt="logo UKS"
            />
            <Image
              width={100}
              height={100}
              src="/assets/logo/pmi-logo.png"
              alt="logo SMK 7 Samarinda"
            />
          </div>
        </div>
        <Image
          quality={100}
          width={750}
          height={750}
          className="absolute right-0 top-0"
          src="/right.png"
          alt="uks-banner"
        />

      </section>
      <section className="py-28">
        <div className="h-full container px-16 flex items-center justify-between">
          <div className="flex flex-col justify-center max-w-sm">
            <div className="grid gap-3">
              <h1 className="text-5xl text-[#1D2739] font-bold">Rapor Kesehatanku</h1>
              <p className="max-w-[18rem] text-lg text-[#475367]">Buku catatan kesehatan tingkat SMP/MTS dan SMK/MA</p>
            </div>

            <Button asChild size="lg" className="mt-8 bg-[#00CC52] hover:bg-[#00CC52]/90 text-white px-4 py-1.5 h-10 w-fit rounded-md">
              <Link href={session?.user ? "#" : "/login"}>
                <KeyRound size={18} className="mr-2"/>
                {session?.user ? "Isi Rapor" : "Login untuk mengisi"}
              </Link>
            </Button>
          </div>
          <div className="h-full w-full flex items-center justify-end">
            <div className="relative flex justify-center items-center">
              <div className="bg-[#0D9247] w-[26rem] h-[20rem] rounded-[50px] rotate-[35deg] drop-shadow-2xl"/>
              <Image
                quality={100}
                width={350}
                height={340}
                className="absolute object-contain"
                src="/rapor-kesehatan.png"
                alt="rapor-kesehatan"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-28">
        <div className="container flex flex-col space-y-4 items-center justify-center">
          <h1 className="text-[#1D2739] text-4xl font-bold">
            Visi
            {" "}
            <span className="text-green-500">&amp;</span>
            {" "}
            Misi
          </h1>
          <div className="max-w-4xl flex flex-col text-lg gap-4 text-[#475367]">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper feugiat tellus, a finibus libero facilisis at. Sed fermentum justo ac sem commodo, sit amet molestie sem facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper feugiat tellus, a finibus libero facilisis at. Sed fermentum justo ac sem commodo, sit amet molestie sem facilisis. </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper feugiat tellus, a finibus libero facilisis at. Sed fermentum justo ac sem commodo, sit amet molestie sem facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper feugiat tellus, a finibus libero facilisis at. Sed fermentum justo ac sem commodo, sit amet molestie sem facilisis. </p>
          </div>
        </div>
      </section>
      <section className="py-28 bg-[#F5F5FF]">
        <div className="container flex items-center justify-center">
          <div className="max-w-5xl flex items-center gap-12">
            <Image
              width={250}
              height={250}
              src="/cta-image.svg"
              alt="hi five image "
            />
            <div className="flex flex-col space-y-4">
              <h1 className="uppercase text-[#1D2739] text-4xl md:leading-[2.5rem] font-bold">Join Komunitas UKS. Bersama Ciptakan Sekolah Sehat!</h1>
              <p className="text-base text-[#475367]">Bersama Komunitas UKS, kita bisa lebih peduli dan memberikan perhatian khusus pada kesehatan di sekolah. Ayo, bergabunglah dan berikan kontribusimu!</p>
              <Button asChild variant="outline" size="lg" className="w-fit bg-white">
                <Link href={session?.user ? "/daftar-anggota-uks" : "/login"}>
                  {session?.user ? (
                      <>
                        <ClipboardList size={18} className="mr-2"/>
                        Daftar Disini
                      </>
                    ) : (
                      <>
                        <KeyRound size={18} className="mr-2"/>
                        Login Untuk Mendaftar
                      </>
                    )}
                </Link>
              </Button>
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
