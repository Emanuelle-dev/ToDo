import { cn } from "@/app/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github } from "lucide-react"
import {signIn, signInWithGoogle } from "@/app/lib/auth-client"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl"></CardTitle>
          <CardDescription>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className=" grid gap-4">
              <div className="grid gap-4">
                <Label htmlFor="email">Email</Label>
                <Input className="grid gap-2 hover:border-indigo-500 border-2 focus:border-indigo-600 "
                  id="email"
                  type="email"
                  placeholder=""
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                    <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:text-indigo-500 text-indigo-600 font-semibold"
                    >
                    Esqueceu a senha?
                    </a>
                </div>
                <Input id="password" type="password" required className="hover:border-indigo-500 border-2 focus:border-indigo-600"/>
              </div>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 gap-4 rounded-lg text-white">
                Login
                </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Ou continue com
                </span>
              </div>
              <div className="flex justify-center gap-4" {...props}>
                <Button variant="outline" className="p-4"
                  onClick={signIn}
                >
                   <Github/>
                </Button>
                <Button variant="outline" className="p-4" onClick={signInWithGoogle} >
                  <svg xmlns="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" viewBox="0 0 24 24" className="h-6 w-6">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                </Button>
              </div>
              <div className="text-center bg-background text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Inscreva-se
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Ao continuar você concorda com os nossos <a href="#">Termos de Serviço</a>{" "}
        e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  )
}
