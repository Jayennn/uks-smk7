import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {cn} from "@/lib/utils";
import {poppins} from "@/lib/font";
import {SessionProvider} from "next-auth/react";
import {type ReactElement, type ReactNode} from "react";
import {Session} from "next-auth";
import {NextPage} from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps<{ session: Session }> & {
    Component: NextPageWithLayout
}
export default function App({
    Component,
    pageProps: {session, ...pageProps}
}: AppPropsWithLayout)
{
    const getLayout = Component.getLayout ?? ((page) => page)
    return (
        <>
            <SessionProvider session={session}>
                <main className={cn(
                    poppins.variable,
                    "min-h-screen bg-background font-sans antialiased"
                )}>
                    {getLayout(<Component {...pageProps} />)}
                </main>
            </SessionProvider>
        </>
    )
}
