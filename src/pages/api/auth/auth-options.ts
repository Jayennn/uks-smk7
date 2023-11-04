import {DefaultSession, getServerSession, NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {Axios} from "@/utils/axios";
import jwt from "jsonwebtoken"
import {GetServerSidePropsContext} from "next";




declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            name: string,
            id: string,
            id_siswa: string | null,
            token: string
        },
        expires: string
    }
}
export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_URL,
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
                console.log("makan: ", credentials?.username)

                const res = await Axios.post("/auth/login", {
                    username: credentials?.username,
                    password: credentials?.password
                });

                const {token} = res.data as {
                    token: {
                        access_token: string,
                        expires_in: number
                    }
                }

                const {user} = jwt.decode(token.access_token) as {
                        exp: number
                        user: {
                            id: number | string,
                            username: string,
                            nama?: string,
                            id_siswa?: string,
                            level: string,
                            last_login: string
                        }

                }
                console.log({oi: user})

                return {
                    ...user,
                    id: user.id.toString(),
                    id_siswa: user.id_siswa ?? null,
                    name: user.username ?? user.nama,
                    token: token.access_token
                }
            },
        })
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        jwt({token, user, session}) {
            console.log({
                token
            })
            return {
                ...token,
                ...user,
                ...session
            };
        },
        session({session, token, }){
            session.user = token as any
            console.log({
                session
            })
            // console.log("ses", session)
            return session
        }
    },
    session: {
        strategy: "jwt"
    },
}

export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
};