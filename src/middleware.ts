import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export default withAuth(
  async function middleware(req,){
    const token = await getToken({req});
    const isAuthenticated = !!token
    const url = req.nextUrl.clone()

    if(!isAuthenticated) {
      return NextResponse.redirect(new URL("/login"))
    }

    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.level != 1) {
      url.pathname = "/login"
      // @ts-ignore
      return NextResponse.redirect(url, req.url as string)
    }
  },
  {
    callbacks: {
      authorized: ({token}) => !!token
    },

    pages: {
      signIn: "/login"
    }
  },
)
export const config = {
  matcher: [
    "/admin/:path*",
    "/authentication"
  ]
}
