"use client";
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
import { useState } from "react";
import axios from 'axios'
import BASE_URL from '../../../../config'
import toast, { Toaster } from 'react-hot-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RegisterPage: NextPage = () => {
  const [nim, setNim] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');


  const handleNimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNim(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    
  };

  const handleRole = (e: string) => {
    setRole(e);
  };

  


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      const notifyPassword = () => toast.error('Password anda tidak sama!');
      notifyPassword();
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/api/register`, {
          nim,
          email,
          name,
          password,
          role,
        });
  
        if (response.data.code === 200) {
          const notify = () => toast.success('Akun berhasil dibuat! Silahkan login!');
          notify();
          setTimeout(() => {
            window.location.href = '/';
  
          }, 2000);
        } else {
          console.log('Register failed');
        }
      } catch (error) {
        console.error("Register failed:", error);
      }
    }
    

    
  }


  return (
    <main className="flex h-screen flex-col items-center justify-center  md:p-24 px-5 absolute inset-0 -z-10  w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <Toaster 
        position="top-center"
        toastOptions={{
            duration: 1800,
            style: {
                background: '#fff',
                color: '#3D9ADD',
            },

          }}
      />
      <Card className="md:px-10 py-14 bg-gradient-to-t from-[#2C78AF] to-[#3D9ADD] ">
        <form onSubmit={handleRegister}>
        <CardHeader>
          <CardTitle className="text-white font-bold text-4xl">Register Account</CardTitle>
          <CardDescription className="text-white">Silahkan Register untuk melakukan survey kepuasaan</CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="nim" className="text-white">NIM</Label>
            <Input
              type="text" 
              id="nim" 
              placeholder="NIM" 
              onChange={handleNimChange}
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input 
              type="email" 
              id="email" 
              placeholder="Email"  
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input 
              type="text" 
              id="name" 
              placeholder="Name"  
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
            <Label htmlFor="name" className="text-white">Role </Label>
            <Select onValueChange={handleRole} value={role} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Siapakah Anda?"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DOSEN">Dosen</SelectItem>
                  <SelectItem value="MAHASISWA">Mahasiswa</SelectItem>
                  <SelectItem value="ALUMNI">Alumni</SelectItem>
                  <SelectItem value="PENGGUNA_ALUMNI">Pengguna Alumni</SelectItem>
                </SelectContent>
              </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input 
              type="password" 
              id="password" 
              placeholder="Password"
              onChange={handlePasswordChange}
              required
              />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
            <Label htmlFor="password" className="text-white">Confirm Password</Label>
            <Input 
              type="password" 
              id="password" 
              placeholder="Confirm Password"
              onChange={handleConfirmPasswordChange}
              required
              />
          </div>
        </CardContent>
        <CardFooter className="justify-center mt-5 flex flex-col">
          <Button size={"default"} variant={"default"} className="bg-[#00B907] hover:bg-[#43a046] w-full" >Register</Button>
          <p className="text-white text-sm mt-3">Sudah punya akun? <a href="/" className="hover:text-[#00B907] font-bold">Log In</a></p>
        </CardFooter>
        </form>
      </Card>
      <p className="text-xs text-gray-400 mt-1" >Copyright 2024</p>
    </main>
  );
};

export default RegisterPage;