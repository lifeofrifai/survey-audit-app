"use client";

import React, { useEffect } from "react";
import CardSurvey from "@/components/CardSurvey";
import axios from "axios";
import { useState } from "react";
import BASE_URL from "../../../../config";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'


export default function page() {

    interface Survey {
        id: number;
        title: string;
        question: string;
    }


    const [data, setData] = useState<Survey[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/survey`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
        });
            if (response.data.code === 200) {
            setData(response.data.data);
            setLoading(false);
            } else {
            console.log('Gagal Mengambil data');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10">
            <div className="mt-10">
                <h1 className="text-4xl font-bold text-center">Selamat datang di web survei AMI dan Akreditasi!</h1>
                <p className="text-center">Silahkan pilih kategori survei</p>
            </div>
            
            {loading === true && (
                <div className="flex items-center justify-center h-screen">
                    <p>Loading....</p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
                {data
                    .filter((item, index, self) => self.findIndex(i => i.title === item.title) === index)
                    .map((item) => (
                        <CardSurvey
                            key={item.id}
                            title={item.title}
                            id={`/category-survey/${item.id}`}
                        />
                    ))
                }
                
            </div>
        </div>
    );
}
    
