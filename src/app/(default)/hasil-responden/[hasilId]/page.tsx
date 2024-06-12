"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import BASE_URL from "../../../../../config";
import AnswerResponse from "@/components/hasil-respon/AnswerResponse";

export default function page() {

    const surveyId = usePathname().split('/').pop();
    const [data, setData] =  useState<any>(null);
    const [allQuestions, setAllQuestions] = useState<any>(null);

    const fetchData = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/survey/${surveyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                setData(response.data.data);
                console.log(response.data.data);
            } else {
                console.log('Gagal Mengambil data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllQuestion = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/question/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                setAllQuestions(response.data.data);
            } else {
                console.log('Gagal Mengambil data');
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchData();
        fetchAllQuestion();
    }, []);

    
    return (
        <div className="items-center justify-center px-5 md:px-10 md:py-14">
            <div className="mx-auto bg-white p-7 md:p-10  rounded-lg">
                {data ? (
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-[#3D9ADD]">Hasil {data.title}</h1>
                ) : (
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-[#3D9ADD]">Loading...</h1>
                )}
                <p className="text-center font-medium">(10 Jawaban)</p>
            </div>
            
            {/* <div className="mt-10">
                {Object.keys(groupedAnswers).length > 0 ? (
                    Object.keys(groupedAnswers).map((questionId) => (
                        <div key={questionId} className="mb-6">
                            <h2 className="text-xl font-semibold">{groupedAnswers[questionId][0].question.question}</h2>
                            <div className="grid grid-cols-4 gap-4 mt-2">
                                {groupedAnswers[questionId].map((answer: { answer: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                                    <div key={index} className="bg-gray-100 p-4 rounded">
                                        <p>{answer.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading answers...</p>
                )}
            </div> */}

            <div className="mt-10 grid grid-cols-1 gap-10 ">
                {allQuestions ? (
                    allQuestions.map((question: any, index: number) => (
                        <AnswerResponse
                            key={index}
                            question_id={question.id}
                            question={question.question}
                        />
                    ))
                ) : (
                    <p>Loading questions...</p>
                )}
                

            </div>
            
        </div>
    );
}
    