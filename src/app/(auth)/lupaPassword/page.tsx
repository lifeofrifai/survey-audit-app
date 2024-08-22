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
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import React from "react";

export default function lupaPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<boolean>(false);
  const [modalOtp, setModalOtp] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [modalNewPassword, setModalNewPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  }


  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/users/send-reset`, {
        email,
      });

      if (response.data.code === 200) {
        if (response.data.data.error === "") {
          setModalOtp(true);
        } else {
          setError(true);
        }
      } else {
        console.log('failed');
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSendToken = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${BASE_URL}/api/users/verify-reset-password`, {
        otp,
      });
      if (response.data.code === 200) {
        if (response.data.data.error === "") {
          localStorage.setItem('resetPassToken', response.data.data.token);
          console.log(response.data.data.token);
          setModalOtp(false);
          setModalNewPassword(true);
        } else {
          const notify = () => toast.error('Kode OTP Salah Atau Kadaluarsa');
          notify();
        }
      } else {
        console.log('failed');
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSendNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('resetPassToken');
      const response = await axios.post(`${BASE_URL}/api/users/reset-password`, {
        new_password: newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.code === 200) {
        if (response.data.data.error === "") {
          const notify = () => toast.success('Password Berhasil Diubah');
          notify();
          setTimeout(() => {
            window.location.href = '/';
          }, 4000);
          localStorage.removeItem('resetPassToken');
        } else {
          console.log('failed');
          const notify = () => toast.error(response.data.data.error);
          notify();
        }
      } else {
        console.log('failed');
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert('An error occurred. Please try again.');
    }
  }
  // Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character

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
                zIndex: 999,
            },
          }}
      />
        <Card className="md:px-10 py-10 bg-gradient-to-t from-[#2C78AF] to-[#3D9ADD]">
          <form onSubmit={handleEmail}>
            <CardHeader>
              <CardTitle className="text-white font-bold text-4xl">Lupa Password</CardTitle>
              <CardDescription className="text-white">Masukan Email Yang teratut Dengan Akun Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="Email" 
                  value={email} 
                  onChange={handleEmailChange} 
                  required 
                />
              </div>
              {error && <p className="text-red-600 text-sm mt-2">*Email Tidak Terdaftar</p>}
            </CardContent>
            <CardFooter className="justify-center  flex flex-col">
              <Button  type="submit" size="default" variant="default" className="bg-[#00B907] hover:bg-[#43a046] w-full">Kirim</Button>
            </CardFooter>
          </form>
        </Card>
        <React.Fragment>
          <Modal open={modalOtp} sx={{zIndex: 99}}>
              <ModalDialog variant="outlined" role="alertdialog" sx={{width: 500}}>
                  <p className="text-xl font-bold">
                      Kode OTP Reset Password Telah Dikirim
                  </p>
                  <p className="font-normal">
                    silahkan cek email <span className="text-[#00B907] font-medium">{email}</span> untuk mendapatkan kode OTP
                  </p>
                    <Input 
                        type="text" 
                        className="w-full mt-1" 
                        placeholder="Masukan Kode OTP"
                        value={otp}
                        onChange={handleOtpChange}
                    />
              <DialogActions>
                  <Button onClick={handleSendToken} variant="default" className="bg-[#00B907] hover:bg-[#43a046]">
                      Kirim
                  </Button>
                  <Button variant="destructive" onClick={() => setModalOtp(false)}>
                      Cancel
                  </Button>
              </DialogActions>
              </ModalDialog>
          </Modal>
        </React.Fragment>
        <React.Fragment>
          <Modal open={modalNewPassword} sx={{zIndex: 99}}>
              <ModalDialog variant="outlined" role="alertdialog" sx={{width: 500}}>
                  <p className="text-xl font-bold">
                      Masukan Password Baru
                  </p>
                  <p className="font-normal">
                    silahkan masukan password baru
                  </p>
                    <Input 
                        type="password" 
                        className="w-full mt-1" 
                        placeholder="Password Baru"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
              <DialogActions>
                  <Button onClick={handleSendNewPassword} variant="default" className="bg-[#00B907] hover:bg-[#43a046]">
                      Kirim
                  </Button>
              </DialogActions>
              </ModalDialog>
          </Modal>
        </React.Fragment>
    </main>
  );
}
