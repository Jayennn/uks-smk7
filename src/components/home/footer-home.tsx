import Image from "next/image";
import {Separator} from "@/components/ui/separator";
import {Instagram, Mail, Phone} from "lucide-react";
import Link from "next/link";

const FooterHome = () => {
  return (
    <>
      <footer className="pt-28">
        <div className="container">
          <div className="flex flex-col lg:flex-row justify-around gap-4">
            <div className="max-w-[22rem] flex items-center gap-3 h-fit">
              <div className="">
                <Image
                  quality={100}
                  width={150}
                  height={150}
                  src="/assets/logo/smk7-logo.png"
                  alt="logo SMK 7 Samarinda"
                />
              </div>
              <h1 className="text-3xl text-[#1D2739] font-semibold">SMK Negeri 7 Samarinda</h1>
            </div>
            <Separator orientation="vertical" className="w-full h-[1px] lg:w-[2px] lg:h-auto rounded-md bg-[#1D2739]"/>
            <div className="px-6 flex flex-col">
              <h5 className="text-lg font-semibold uppercase">Link Terkait</h5>
              <ul className="pt-8 font-medium space-y-3">
                <li>SMK Negeri 7 Samarinda</li>
                <li>BNSP</li>
                <li>LSP P1 SMK Negeri 7 Samarinda</li>
              </ul>
            </div>
            <Separator orientation="vertical" className="w-full h-[1px] lg:w-[2px] lg:h-auto rounded-md bg-[#1D2739]"/>
            <div className="w-full md:max-w-sm px-6 flex flex-col">
              <h5 className="text-lg font-semibold uppercase">Alamat</h5>
              <ul className="pt-8 font-medium space-y-3">
                <li className="max-w-sm">Jl. Aminah Syukur No 82, Samarinda Kalimantan Timur</li>
                <li>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.667492620324!2d117.15414527416826!3d-0.49819919949691865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67f76be07b415%3A0xc0cdd36b3705778d!2sSMK%20Negeri%207%20Samarinda!5e0!3m2!1sid!2sid!4v1700290609543!5m2!1sid!2sid" className="border-0 h-[10rem] w-full" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 h-[2px]" orientation="horizontal"/>
          <div className="pb-8 flex flex-col md:flex-row items-center justify-between">
            <p className="font-medium">Copyright &copy; PPLG_2021 | ALL RIGHTS RESERVED</p>
            <div className="mt-8 md:mt-0 flex flex-col lg:flex-row items-start lg:items-center gap-4 text-sm font-medium">
              <Link href="#" className="inline-flex space-x-2">
                <Instagram size={21}/>
                {/*<p>lsp_p1_smkn7smd</p>*/}
              </Link>
              <Link href="#"  className="inline-flex space-x-2">
                <Phone size={21}/>
                {/*<p>(0541) 7777769</p>*/}
              </Link>
              <Link href="#"  className="inline-flex space-x-2">
                <Mail size={21} />
                {/*<p>lsp_p1@smkn7-smr.sch.id</p>*/}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default FooterHome;
