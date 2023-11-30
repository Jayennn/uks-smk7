import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {cn} from "@/lib/utils";
import {SessionProvider} from "next-auth/react";
import {type ReactElement, type ReactNode} from "react";
import {Session} from "next-auth";
import {NextPage} from "next";
import {trpc} from "@/utils/trpc";
import { Toaster } from "sonner"
import {poppins} from "@/lib/font";
import NProgress from "nextjs-progressbar";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps<{ session: Session }> & {
    Component: NextPageWithLayout
}
const MyApp = ({
    Component,
    pageProps: {session, ...pageProps}
}: AppPropsWithLayout) => {
    const getLayout = Component.getLayout || ((page) => page)
    return (
        <>
            <SessionProvider session={session}>
                <NProgress color="#000000"/>
                    {getLayout(<Component {...pageProps} />)}
                <Toaster richColors position="top-right"/>
            </SessionProvider>
        </>
    )
}

export default trpc.withTRPC(MyApp)
