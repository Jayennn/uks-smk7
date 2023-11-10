import NextAuth from "next-auth";
import {auth} from "@/server/api/auth";

export default NextAuth(auth);
