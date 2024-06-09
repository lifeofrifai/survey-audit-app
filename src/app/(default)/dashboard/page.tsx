"use client";

import React, { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import BASE_URL from "../../../../config";
import { CirclePlus } from "lucide-react"


export default function page() {

    const blockUser = () => {
        const user = localStorage.getItem('user');
        if (user === 'ADMIN') {
            return true;
        } else {
            window.history.back();
        }
    }

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
        blockUser();
        fetchData();
    }, []);

    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10">
            <div className="mt-10">
                <h1 className="text-4xl font-bold text-center">Dashboard Admin Survey</h1>
            </div>

            <div className=" mt-24">
                <div className="w-30 mb-5 flex flex-row justify-end">
                    <Link href={"/dashboard/addSurvey"} >
                        <Button type="button" size="default" variant="default" className="bg-[#00B907] hover:bg-[#43a046]">
                            <CirclePlus className="mr-2 h-4 w-4"/>
                            Create Survey
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                    {data.map((item) => (
                        <DashboardCard
                                key={item.id}
                                title={item.title}
                                id={item.id}
                            />
                    ))}
                </div>
            </div>
        </div>
    );
}
    
