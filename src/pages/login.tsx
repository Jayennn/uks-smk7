import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {LoginForm, loginSchema} from "@/schema/auth";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";


const Login = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const onSubmit = async({username, password}: LoginForm) => {
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
            callbackUrl: "/"
        })

        if(!res?.ok) {
            console.log(res?.error)
            return;
        }

        await router.replace(`${res.url ?? ""}`)
    }

    return (
        <>
           <div className="h-screen grid place-content-center">
                <form onSubmit={handleSubmit(onSubmit)} className="w-[24rem] max-w-sm flex flex-col rounded-lg border">
                    <div className="flex flex-col space-y-1 p-6">
                        <h3 className="tracking-tight text-2xl font-semibold">Welcome to UKS!</h3>
                        <p className="text-sm text-muted-foreground">Login First!</p>
                    </div>
                    <div className="grid gap-4 p-6 pt-0">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Username</Label>
                            <Input
                                {...register("username")}
                                className="text-sm"
                                id="email"
                                type="text"
                                placeholder="Masukkan Username"
                            />
                            <p className="text-xs text-red-500 font-medium">{errors?.username?.message ?? ""}</p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                className="text-sm"
                                {...register("password")}
                                id="password"
                                type="password"
                            />
                            <p className="text-xs text-red-500 font-medium">{errors?.password?.message ?? ""}</p>
                        </div>
                        <Button>
                            Login
                        </Button>
                    </div>
                </form>
           </div>
        </>
    )
}

export default Login