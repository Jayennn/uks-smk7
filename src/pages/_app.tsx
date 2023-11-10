import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {cn} from "@/lib/utils";
import {poppins} from "@/lib/font";
import {SessionProvider} from "next-auth/react";
import {type ReactElement, type ReactNode} from "react";
import {Session} from "next-auth";
import {NextPage} from "next";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {trpc} from "@/utils/trpc";

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
    const queryClient = new QueryClient
    const getLayout = Component.getLayout || ((page) => page)
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <SessionProvider session={session}>
                    <main className={cn(
                        "min-h-screen bg-background font-inter antialiased"
                    )}>
                        {getLayout(<Component {...pageProps} />)}
                    </main>
                </SessionProvider>
            </QueryClientProvider>
        </>
    )
}

export default trpc.withTRPC(MyApp)
