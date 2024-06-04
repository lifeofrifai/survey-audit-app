"use client";
import React, { useEffect, useState } from "react";
import CardSurveyHasil from "@/components/CardSurveyHasil";
import axios from "axios";
import BASE_URL from "../../../../config";

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

    console.log(data);


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10">
            <div className="mt-10">
                <h1 className="text-4xl font-bold text-center">Hasil Responden</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
                {data
                    .filter((item, index, self) => self.findIndex(i => i.title === item.title) === index)
                    .map((item) => (
                        <CardSurveyHasil
                            key={item.id}
                            title={item.title}
                            id={`/hasil-responden/${item.id}`}
                        />
                    ))
                }
            </div>
        </div>
    );
}
    
