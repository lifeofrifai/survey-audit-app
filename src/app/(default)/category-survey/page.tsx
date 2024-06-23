"use client";

import React, { useEffect, useState } from "react";
import CardSurvey from "@/components/CardSurvey";
import axios from "axios";
import BASE_URL from "../../../../config";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

export default function Page() {

    interface Survey {
        id: number;
        title: string;
        question: string;
    }

    interface Answer {
        id: number;
        question_id: number;
        user_id: number;
        answer: string;
        question: any[];
        user: any[];
        created_at: string;
        updated_at: string;
    }

    const [data, setData] = useState<Survey[]>([]);
    const [loading, setLoading] = useState(true);

    // const fetchData = async () => {
    //     try{
    //         const token = localStorage.getItem('token');
    //         const response = await axios.get(`${BASE_URL}/api/survey`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             },
    //         });
    //         if (response.data.code === 200) {
    //         setData(response.data.data);
    //         setLoading(false);
    //         } else {
    //         console.log('Gagal Mengambil data');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    const fetchData = async () => {
        try {
            const idUser = localStorage.getItem('id') ?? "";
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/survey`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                let surveys = response.data.data;

                // Fetching answers to filter completed surveys
                const answersResponse = await axios.get(`${BASE_URL}/api/answer`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                if (answersResponse.data.code === 200) {
                    const answers: Answer[] = answersResponse.data.data;

                    // Filter out surveys completed by the current user
                    const completedSurveyIds = new Set(
                        answers
                            .filter(answer => answer.user_id === parseInt(idUser))
                            .map(answer => answer.question[0].survey_id)
                    );

                    surveys = surveys.filter((survey: { id: any; }) => !completedSurveyIds.has(survey.id));
                }

                setData(surveys);
                setLoading(false);
            } else {
                console.log('Failed to fetch data');
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
