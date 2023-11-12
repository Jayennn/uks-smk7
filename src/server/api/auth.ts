import {DefaultSession, getServerSession, NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {Axios} from "@/utils/axios";
import jwt from "jsonwebtoken"
import {GetServerSidePropsContext} from "next";




declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string,
            username: string,
            level: string,
            last_login: string,
            token: string

        },
        expires: string
    }
}
export const auth: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Masukkan Username"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                const res = await Axios.post("/auth/login", {
                    username: credentials?.username,
                    password: credentials?.password
                });

               const data = res.data as {
                   message: string,
                   token: string,
                   user: {
                       id: string | number,
                       username: string,
                       level: string,
                       created_at: string,
                       updated_at: string
                   }
               }

               if(data.user){
                   return {
                       message: data.message,
                       token: data.token,
                       ...data.user,
                       id: data.user.id.toString()
                   };
               } else {
                   return  null;
               }

            },
        })
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        jwt({token, user}) {
            return { ...token, ...user };
        },
        session({session, token, }){
            session.user = token as any
            return session
        }
    },
}

export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) => {
    return getServerSession(ctx.req, ctx.res, auth);
};
