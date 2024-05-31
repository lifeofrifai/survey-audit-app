import { NextPage } from 'next';
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

const RegisterPage: NextPage = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center  md:p-24 px-5 absolute inset-0 -z-10  w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <Card className="md:px-10 py-14 bg-gradient-to-t from-[#2C78AF] to-[#3D9ADD] ">
        <CardHeader>
          <CardTitle className="text-white font-bold text-4xl">Register Account</CardTitle>
          <CardDescription className="text-white">Silahkan Register untuk melakukan survey kepuasaan</CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username" className="text-white">Username</Label>
            <Input type="text" id="username" placeholder="Username"  />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input type="email" id="email" placeholder="Email"  />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
            <Label htmlFor="password" className="text-white">Confirm Password</Label>
            <Input type="password" id="password" placeholder="Confirm Password" />
          </div>
        </CardContent>
        <CardFooter className="justify-center mt-5 flex flex-col">
          <Button size={"default"} variant={"default"} className="bg-[#00B907] hover:bg-[#43a046] w-full" >Register</Button>
          <p className="text-white text-sm mt-3">Sudah punya akun? <a href="/" className="hover:text-[#00B907] font-bold">Log In</a></p>
        </CardFooter>
      </Card>
      <p className="text-xs text-gray-400 mt-1" >Copyright 2024</p>
    </main>
  );
};

export default RegisterPage;