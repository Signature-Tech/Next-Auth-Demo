'use client';
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function form() {

    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const response = await signIn('credentials', {
          email : formData.get("email"),
          password : formData.get("password"),
          redirect : false,
      })
      if (!response?.error) {
        router.push("/")
        router.refresh()
      }
    }
    
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-[350px]">
          <CardHeader className="flex items-center p-8">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Welcome to Auth Demo</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <form onSubmit={handleSubmit}>
                <div className="p-2">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email</Label>
                    <Input name="email" placeholder="example@example.com" />
                    </div>
                </div>
                <div className="p-2">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Password</Label>
                    <Input name="password" placeholder="********" />
                    </div>
                </div>
                <div className="flex p-5 justify-center">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
            <CardFooter className="flex items-center justify-center">
                <CardDescription className="text-[12px]"><Link href="/signup"> Don't Have An Account ? Sign Up </Link></CardDescription>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    )
}