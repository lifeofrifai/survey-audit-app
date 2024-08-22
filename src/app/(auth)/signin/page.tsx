"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BASE_URL from "../../../../config";
import toast, { Toaster } from 'react-hot-toast';
import { getCsrfToken } from 'next-auth/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); 
  const [roleError, setRoleError] = useState(false);
  const notify = () => toast.error('Email atau Password salah!');
  const notifyRole = () => toast.error('Role tidak sesuai!');

  

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRole = (e: string) => {
    setRole(e);
    setRoleError(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setRoleError(true);
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });

      if (response.data.code === 200) {
        if (response.data.data.role === role) {
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('user', response.data.data.role);
          localStorage.setItem('id', response.data.data.id);
          localStorage.setItem('email', response.data.data.email);
          localStorage.setItem('name', response.data.data.name);
          localStorage.setItem('nim', response.data.data.nim);

          const user = localStorage.getItem('user');
          if (user === 'ADMIN') {
            window.location.href = '/dashboard';
          } else {
            window.location.href = '/category-survey';
          }
        } else {
          console.log('Login failed');
          notifyRole();
        }
      } else {
        console.log('Login failed');
        notify();
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert('An error occurred during login. Please try again.');
    }
  };
 

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center md:p-24 px-5">
      <Image
            src="/LOGIN.PNG"
            alt="BACKGROUND"
            className="-z-10 absolute w-full h-full"
            width={2000}
            height={2000}
            priority
        /> 
      <Toaster 
        position="top-center"
        toastOptions={{
            duration: 3000,
            style: {
                background: '#3D9ADD',
                color: '#fff',
            },
          }}
      />
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-52 ">
        <div className=" hidden md:block">
            <div className=" -ml-3 flex ">
              <Image
                  src="/usk-logo.png"
                  alt="SIMRS BACKGROUND"
                  width={200}
                  height={0}
              /> 
              <Image
                  src="/inf-logo.png"
                  alt="SIMRS BACKGROUND"
                  width={100}
                  height={0}
              /> 
            </div>
            <div className="flex flex-col gap-2 text-[#232323] mt-20">
              <p className="font-extrabold text-8xl">SIAMI</p>
              <p className="font-bold text-2xl ">Survey Audit Mutu Internal dan Akreditasi</p>
              <p className="text-lg">Jurusan Informatika Universitas Syiah Kuala</p>
            </div>
            
        </div>
        <Card className="md:px-10 py-10 bg-gradient-to-t from-[#2C78AF] to-[#3D9ADD]">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle className="text-white font-bold text-4xl">Sign In SIAMI</CardTitle>
              <CardDescription className="text-white">Silahkan Masuk untuk melakukan survey kepuasaan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Select onValueChange={handleRole} value={role} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Masuk Sebagai"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DOSEN">Dosen</SelectItem>
                    <SelectItem value="MAHASISWA">Mahasiswa</SelectItem>
                    <SelectItem value="ALUMNI">Alumni</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="PENGGUNA_ALUMNI">Pengguna Alumni</SelectItem>
                  </SelectContent>
                </Select>
                {roleError && <p className="text-red-700 text-sm">Please select a role.</p>}
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="Email" 
                  value={email} 
                  onChange={handleEmailChange} 
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input 
                  type="password" 
                  id="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={handlePasswordChange} 
                  required 
                />
              </div>
              <p className="text-white text-sm text-right mt-3 font-medium"><a href="/lupaPassword" className="hover:text-[#00B907] ">Lupa Password?</a></p>
            </CardContent>
            <CardFooter className="justify-center mt-5 flex flex-col">
              <Button  type="submit" size="default" variant="default" className="bg-[#00B907] hover:bg-[#43a046] w-full">Sign In</Button>
              <p className="text-white text-sm mt-3">Belum punya akun? <a href="/signUp" className="hover:text-[#00B907] font-bold">Register</a></p>
            </CardFooter>
          </form>
        </Card>
      </div>

      

    </main>
  );
}
