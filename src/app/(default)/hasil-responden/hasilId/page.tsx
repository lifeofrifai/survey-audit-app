"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Tidak Puas', 'Cukup Puas', 'Puas', 'Sangat Puas'],
    datasets: [
      {
        label: 'Jumlah Voter',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


export default function page() {
    return (
        <div className="items-center justify-center px-5 md:px-10">
            <div className="mt-10">
                <h1 className="text-2xl md:text-3xl font-bold text-center">Hasil Survey Kinerja Lulusan </h1>
                <p className="text-center font-medium">(10 Jawaban)</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-10">
                <div className=" p-3 md:p-7  outline outline-gray-300 rounded-md">
                    <h1 className="font-bold text-lg md:text-xl">Pertanyaan: </h1>
                    <p className="font-semibold text-base md:text-lg mb-5 bg-green-100">Nama Lengkap</p>
                    <div className="grid grid-cols-4 gap-4">
                        <p className="p-2 outline outline-gray-300 rounded-md text-center">Muhammad Nurifai</p>
                        <p className="p-2 outline outline-gray-300 rounded-md text-center">Muhammad Nurifai</p>
                        <p className="p-2 outline outline-gray-300 rounded-md text-center">Muhammad Nurifai</p>
                        <p className="p-2 outline outline-gray-300 rounded-md text-center">Muhammad Nurifai</p>
                        <p className="p-2 outline outline-gray-300 rounded-md text-center">Muhammad Nurifai</p>
                        <p className="p-2 outline outline-gray-300 rounded-md text-center">Muhammad Nurifai</p>
                        <p className="p-2 outline outline-gray-300 rounded-md text-center">Muhammad Nurifai</p>
                        <p className="p-2 outline outline-gray-300 rounded-md text-center">Muhammad Nurifai</p>
                        <p className="p-2 outline outline-gray-300 rounded-md text-center">Muhammad Nurifai</p>
                        <p className="p-2 outline outline-gray-300 rounded-md text-center">Muhammad Nurifai</p>
                    </div>
                </div>
                <div className=" p-2 md:p-7  outline outline-gray-300 rounded-md">
                    <h1 className="font-bold text-xl">Pertanyaan: </h1>
                    <p className="font-semibold text-lg mb-5 bg-green-100">Seberapa besar tingkat kepentingan dan tingkat kepuasan perusahaan/ institusi Bapak/Ibu terhadap Universitas Syiah Kuala</p>
                    <div className="md:w-2/5">
                        <Pie data={data} />
                    </div>
                </div>
                <div className=" p-2 md:p-7  outline outline-gray-300 rounded-md">
                    <h1 className="font-bold text-xl">Pertanyaan: </h1>
                    <p className="font-semibold text-lg mb-5 bg-green-100">Seberapa besar tingkat kepentingan dan tingkat kepuasan perusahaan/ institusi Bapak/Ibu terhadap Universitas Syiah Kuala</p>
                    <div className="md:w-2/5">
                        <Pie data={data} />
                    </div>
                </div>
                <div className=" p-2 md:p-7  outline outline-gray-300 rounded-md">
                    <h1 className="font-bold text-xl">Pertanyaan: </h1>
                    <p className="font-semibold text-lg mb-5 bg-green-100">Seberapa besar tingkat kepentingan dan tingkat kepuasan perusahaan/ institusi Bapak/Ibu terhadap Universitas Syiah Kuala</p>
                    <div className="md:w-2/5">
                        <Pie data={data} />
                    </div>
                </div>
            </div>
            
        </div>
    );
}
    