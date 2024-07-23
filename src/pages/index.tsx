import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import LayoutHome from "@/components/home/layout/layout-home";
import Link from "next/link";

const Page: NextPageWithLayout = () => {
    const router = useRouter();
    const [time, setTime] = useState<number>(10);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime((prevState) => {
                if (prevState <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevState - 1;
            });
        }, 1000);

        const newPageRedirect = setTimeout(() => {
            router.push("https://uks.smkn7-smr.sch.id/");
        }, 10000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(newPageRedirect);
        };
    }, [router]);

    return (
        <>
            <Head>
                <title>Welcome - UKS-SMK7</title>
                <meta property='og:url' content={`https://uks-smk7.vercel.app${router.asPath}`} />
                <link rel='canonical' href={`https://uks-smk7.vercel.app${router.asPath}`} />
                {/* Open Graph */}
                <meta property='og:type' content="website" />
                <meta property='og:site_name' content="UKS-SMK 7" />
                <meta property='og:description' content="Usaha Kesehatan Sekolah SMK 7 Samarinda" />
                <meta property='og:title' content="UKS-SMK 7" />
                <meta name='image' property='og:image' content="https://uks-smk7.vercel.app/og-image.png" />
            </Head>
            <div>
                <div className="h-screen container grid gap-4 justify-items-center place-content-center">
                    <Image
                        src="/coming-soon.svg"
                        alt="coming-soon"
                        width={240}
                        height={240}
                    />
                    <div className="flex flex-col gap-2 justify-center text-center">
                        <h1 className="text-4xl font-bold text-[#1D2739]">Coming Soon!</h1>
                        <p className="text-lg font-medium text-[#475367]">
                            We are currently working on this feature and will launch soon.
                        </p>
                    </div>
                    <p className="text-[#475367] text-center">
                        In {time} seconds you will be redirected to{" "}
                        <Link className="underline text-green-500/80" href="https://uks.smkn7-smr.sch.id/">
                            https://uks.smkn7-smr.sch.id/
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <LayoutHome>{page}</LayoutHome>;
};

export default Page;
