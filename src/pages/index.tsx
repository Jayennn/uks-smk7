import {NextPageWithLayout} from "@/pages/_app";
import LayoutHome from "@/components/home/layout/layout-home";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ClipboardList, FileText, KeyRound} from "lucide-react";
import {useSession} from "next-auth/react";
import Head from "next/head";
import {useRouter} from "next/router";
import {ReactElement} from "react";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const {data: session} = useSession();

  return (
    <>
      <Head>
        <title>Welcome - UKS-SMK7</title>
        <meta property='og:url' content={`https://uks-smk7.vercel.app${router.asPath}`} />
        <link rel='canonical' href={`https://uks-smk7.vercel.app${router.asPath}`} />
        {/* Open Graph  */}
        <meta property='og:type' content="website" />
        <meta property='og:site_name' content="UKS-SMK 7" />
        <meta property='og:description' content="Usaha Kesehatan Sekolah SMK 7 Samarinda" />
        <meta property='og:title' content="UKS-SMK 7" />
        <meta name='image' property='og:image' content="https://uks-smk7.vercel.app/og-image.webp" />
      </Head>
      <section className="py-28">
        <div className="container lg:px-20 flex items-center justify-between">
          <div className="max-w-xl relative flex flex-col">
            <h1 className="text-5xl font-bold text-[#1D2739]  md:leading-[3.5rem]">
              Usaha Kesehatan Sekolah{" "}
              <span className="inline-block text-green-500">
                SMK NEGERI 7
              </span>
              {" "}
              Samarinda
            </h1>
            <div className="mt-8 grid grid-cols-2 justify-items-center md:grid-cols-4 gap-3">
              <Image
                width={100}
                height={100}
                src="/assets/logo/logo-smk7.png"
                alt="logo SMK 7 Samarinda"
              />
              <Image
                width={100}
                height={100}
                src="/assets/logo/dinas-kesehatan.png"
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
            width={450}
            height={450}
            className="hidden min-[1300px]:block"
            src="/banner3.svg"
            alt="uks-banner"
          />
        </div>
      </section>
      <section className="py-28">
        <div className="container lg:px-20 flex flex-col md:flex-row lg:items-center justify-between">
          <div className="flex flex-col  justify-center max-w-sm">
            <div className="grid gap-3">
              <h1 className="text-5xl text-[#1D2739] font-bold">Rapor Kesehatanku</h1>
              <p className="max-w-[18rem] text-lg text-[#475367]">Buku catatan kesehatan tingkat SMP/MTS dan SMK/MA</p>
            </div>

            <Button asChild size="lg" className="mt-8 bg-[#00CC52] hover:bg-[#00CC52]/90 text-white px-4 py-1.5 h-10 w-fit rounded-md">
              <Link href={session?.user ? "/rapor-kesehatan" : "/login"}>
                {session?.user ? (
                  <>
                    <FileText size={18} className="mr-2"/>
                    Isi Rapor
                  </>
                ) : (
                  <>
                    <KeyRound size={18} className="mr-2"/>
                    Login untuk mengisi
                  </>
                )}
              </Link>
            </Button>
          </div>
          <div className="pt-[10rem] md:pt-0 h-full w-full flex items-center justify-center lg:justify-end">
            <div className="relative flex justify-center items-center">
              <div className="bg-[#0D9247] w-[18rem] h-[19rem] md:w-[22rem] md:h-[18rem] lg:w-[26rem] lg:h-[20rem]
               rounded-[50px] rotate-[35deg] drop-shadow-2xl"/>
              <Image
                quality={100}
                width={350}
                height={340}
                className="w-[18rem] h-[20rem] md:w-[18rem] md:h-[22rem] lg:w-[22rem] lg:h-[24rem] absolute object-contain"
                src="/rapor-kesehatan.webp"
                alt="rapor-kesehatan"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-28">
        <div className="container lg:px-20 flex flex-col space-y-4 items-center justify-center">
          <h1 className="text-[#1D2739] text-4xl font-bold">
            Visi
            {" "}
            <span className="text-green-500">&amp;</span>
            {" "}
            Misi
          </h1>
          <div className="max-w-4xl flex flex-col text-base md:text-lg gap-4 text-[#475367]">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper feugiat tellus, a finibus libero facilisis at. Sed fermentum justo ac sem commodo, sit amet molestie sem facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper feugiat tellus, a finibus libero facilisis at. Sed fermentum justo ac sem commodo, sit amet molestie sem facilisis. </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper feugiat tellus, a finibus libero facilisis at. Sed fermentum justo ac sem commodo, sit amet molestie sem facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper feugiat tellus, a finibus libero facilisis at. Sed fermentum justo ac sem commodo, sit amet molestie sem facilisis. </p>
          </div>
        </div>
      </section>
      <section className="py-28 bg-[#F5F5FF]">
        <div className="container lg:px-20 flex items-center justify-center">
          <div className="max-w-5xl flex flex-col md:flex-row  items-center gap-12">
            <Image
              width={250}
              height={250}
              src="/cta-image.svg"
              alt="hi five image "
            />
            <div className="flex flex-col space-y-4">
              <h1 className="uppercase text-[#1D2739] text-4xl md:leading-[2.5rem] font-bold">
                Bersama Ciptakan Sekolah Sehat!
              </h1>
              <p className="text-base text-[#475367]">Bersama Komunitas UKS, kita bisa lebih peduli dan memberikan perhatian khusus pada kesehatan di sekolah. Ayo, bergabunglah dan berikan kontribusimu!</p>
              <Button asChild variant="outline" size="lg" className="w-fit bg-white">
                <Link href={session?.user ? "/registration-uks" : "/login"}>
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
