import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export default withAuth(
  async function middleware(req,){
    const token = await getToken({req});
    const isAuthenticated = !!token

    if (isAuthenticated && token?.level === 4) {
      return NextResponse.redirect("/");
    }

    if (req.nextUrl.pathname === "/admin" && req.nextauth.token?.level != 1) {
      return new NextResponse("You are not authorized");
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