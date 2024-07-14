"use client";

import React, { useEffect, useState } from "react";
import CardSurvey from "@/components/CardSurvey";
import axios from "axios";
import BASE_URL from "../../../../config";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

export default function Page() {

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try{
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('user');
            const response = await axios.get(`${BASE_URL}/api/survey`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                const filteredData = response.data.data.filter((survey: any) => survey.role === role);
                console.log("User role", role);
                setData(filteredData);
                console.log("Data Survey", filteredData);
                setLoading(false);;
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
        <div className="items-center justify-center px-5 md:px-10">
            <div className="mt-10">
                <h1 className="text-4xl font-bold text-center">Selamat datang di web survei AMI dan Akreditasi!</h1>
                <p className="text-center">Silahkan pilih kategori survei</p>
            </div>
            
            {/* {loading === true && (
                <div className="flex items-center justify-center mt-44">
                    <p>Loading....</p>
                </div>
            )} */}
            {data.length === 0 && (
                <div className="flex items-center justify-center mt-44">
                    <p>Tidak ada Survey</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 ">
                
                {data.map((item) => (
                    <CardSurvey
                        key={item.id}
                        title={item.title}
                        id={`/category-survey/${item.id}`}
                    />
                ))}
                
            </div>
        </div>
    );
}
