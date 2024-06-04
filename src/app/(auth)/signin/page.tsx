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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const notify = () => toast.error('Email atau Password salah!');

  

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/loginpublic`, {
        email,
        password,
      });

      if (response.data.code === 200) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', response.data.data.role);
        localStorage.setItem('email', response.data.data.email);
        localStorage.setItem('name', response.data.data.name);
        localStorage.setItem('nim', response.data.data.nim);
        localStorage.setItem('id', response.data.data.id);


        
        const role = localStorage.getItem('user');
        if (role === 'ADMIN') {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/category-survey';
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
    <main className="absolute inset-0 -z-10 w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex h-screen flex-col items-center justify-center md:p-24 px-5">
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
      <Card className="md:px-10 py-14 bg-gradient-to-t from-[#2C78AF] to-[#3D9ADD]">
        <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle className="text-white font-bold text-4xl">Sign In Survey</CardTitle>
            <CardDescription className="text-white">Silahkan Masuk untuk melakukan survey kepuasaan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full max-w-sm items-center gap-1.5">
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
          </CardContent>
          <CardFooter className="justify-center mt-5 flex flex-col">
            <Button  type="submit" size="default" variant="default" className="bg-[#00B907] hover:bg-[#43a046] w-full">Sign In</Button>
            <p className="text-white text-sm mt-3">Belum punya akun? <a href="/signUp" className="hover:text-[#00B907] font-bold">Register</a></p>
          </CardFooter>
        </form>
      </Card>
      <p className="text-xs text-gray-400 mt-1">Copyright 2024</p>
    </main>
  );
}
