import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {cn} from "@/lib/utils";
import {SessionProvider} from "next-auth/react";
import {type ReactElement, type ReactNode} from "react";
import {Session} from "next-auth";
import {NextPage} from "next";
import {trpc} from "@/utils/trpc";
import { Toaster } from "@/components/ui/toaster"
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
                    <main className={cn(
                        poppins.variable,
                        "min-h-screen bg-background font-poppins antialiased"
                    )}>
                        {getLayout(<Component {...pageProps} />)}
                        <Toaster />
                    </main>
                </SessionProvider>
        </>
    )
}

export default trpc.withTRPC(MyApp)
