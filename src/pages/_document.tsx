import {Head, Html, Main, NextScript} from 'next/document'
import {cn} from "@/lib/utils";
import {poppins} from "@/lib/font";

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body className={cn(
        poppins.variable,
        "min-h-screen bg-background font-poppins antialiased"
      )}>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  )
}
