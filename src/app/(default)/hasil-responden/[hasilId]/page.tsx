"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import BASE_URL from "../../../../../config";
import AnswerText from "@/components/hasil-respon/AnswerText";
import AnswerChart from "@/components/hasil-respon/AnswerChart";

export default function page() {

    const surveyId = usePathname().split('/').pop();
    const [data, setData] =  useState<any>(null);
    const [surveyQuestions, setSurveyQuestions] = useState<any>(null);
    const [totalResponden, setTotalResponden] = useState(0);

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

    const fetchSurveyQuestion = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/question/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                const filteredQuestions = response.data.data.filter((question: any) => question.survey_id === parseInt(surveyId || '', 10));
                setSurveyQuestions(filteredQuestions);
                console.log("Filtered Survey Questions", filteredQuestions);
            } else {
                console.log('Gagal Mengambil data');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCountResponden = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/answer`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                const answers = response.data.data;
                
                // Get IDs of survey questions
                const surveyQuestionIds = surveyQuestions.map((question: any) => question.id);
                
                // Filter answers for the current survey's questions
                const filteredAnswers = answers.filter((answer: any) => surveyQuestionIds.includes(answer.question[0].id));
    
                // Use a Set to track unique user IDs
                const uniqueUserIds = new Set<number>();
                filteredAnswers.forEach((answer: any) => {
                    uniqueUserIds.add(answer.user[0].id); // Assuming each answer has a user array with one user
                });
    
                // Update state with the count of unique users and total responses
                setTotalResponden(uniqueUserIds.size); // Total unique users
    
                console.log("Total Unique Users: ", uniqueUserIds.size);
                console.log("Total Responses: ", filteredAnswers.length);
            } else {
                console.log('Failed to fetch data');
            }
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        fetchData();
        fetchSurveyQuestion();
    }, []);

    useEffect(() => {
        if (surveyQuestions) {
            fetchCountResponden();
        }
    }, [surveyQuestions]);
    console.log("Total Responden", totalResponden);

    
    return (
        <div className="items-center justify-center px-5 md:px-10 md:py-14">
            <div className="mx-auto bg-white p-7 md:p-10  rounded-lg">
                {data ? (
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-[#3D9ADD]">Hasil {data.title}</h1>
                ) : (
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-[#3D9ADD]">Loading...</h1>
                )}
                <p className="text-center font-medium">({totalResponden} Jawaban)</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-10 ">
                {surveyQuestions ? (
                    surveyQuestions.map((item: any) => (
                        <div key={item.id}>
                            {(item.type === 'text' || item.type === 'long_text') && (
                                <AnswerText
                                    question_id={item.id}
                                    question={item.question}
                                />
                            )}
                            {(item.type === 'puas_choice' || item.type === 'jenis_kelamin' || item.type === 'setuju_choice') && (
                                <AnswerChart
                                    question_id={item.id}
                                    question={item.question}
                                    type={item.type}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center">Loading questions...</p>
                )}
                

            </div>
            
        </div>
    );
}
    