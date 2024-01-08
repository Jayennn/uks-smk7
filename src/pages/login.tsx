import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {LoginForm, loginSchema} from "@/server/api/routers/auth/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useState} from "react";
import {Loader, LogIn} from "lucide-react";
import {cn} from "@/lib/utils";



const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {data: sesh} = useSession();

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
        setIsLoading(true)
        const res = await signIn("credentials", {
            username,
            password,
            callbackUrl: "/authentication",
            redirect: false
        })

        if(!res?.ok && !sesh?.user.level) {
            console.log(res?.error)
            return;
        }

        await router.replace(`${res?.url ?? "/"}`)
        setIsLoading(false)
    }

    return (
      <>
          <div className="container h-screen flex justify-center items-center">
              <div className="w-full md:max-w-sm rounded-lg border">
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
                          <Button className={cn(isLoading && "text-muted-foreground")}>
                              {isLoading ? (
                                <>
                                    <Loader size={18} className="mr-2 animate-spin"/>
                                    Processing...
                                </>
                              ) : (
                                <>
                                    <LogIn size={18} className="mr-2"/>
                                    Login
                                </>
                              )}
                          </Button>
                      </div>
                  </form>
              </div>
          </div>
      </>
    )
}

export default Login;
