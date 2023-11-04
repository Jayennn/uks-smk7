import NextAuth from "next-auth";
import {authOptions} from "@/pages/api/auth/auth-options";

export default NextAuth(authOptions);

