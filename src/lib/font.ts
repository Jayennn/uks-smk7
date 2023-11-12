import {Inter, Poppins} from "next/font/google"
export const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700", "800"]
})

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter"
})
