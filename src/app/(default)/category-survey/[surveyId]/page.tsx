"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import BASE_URL from "../../../../../config";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import TextFormSurvey from "@/components/form/TextFormSurvey";
import JenisKelaminChoise from "@/components/form/JenisKelaminChoise";
import PuasChoise from "@/components/form/PuasChoise";
import SetujuChoise from "@/components/form/SetujuChoise";
import LongTextFormSurvey from "@/components/form/LongTextFormSurvey";
import toast, { Toaster } from 'react-hot-toast';


export default function page() {

    interface Question {
        id: number;
        survey_id: number;
        question: string;
        type: string;
    }

    interface FormData {
        [key: string]: string;
    }

    
    const surveyId = usePathname().split('/').pop();
    const [data, setData] =  useState<any>(null);
    const [question, setQuestion] = useState<Question[]>([]);
    const [form, setForm] = useState<FormData>({});
    const [haveAnswered, setHaveAnswered] = useState(false);
    const notifySuccsessSurvey = () => toast.success('Survey Berhasil diisi!');
    const notifyFailedSurvey = () => toast.error('Survey Gagal diisi!');

    const fetchData = async () => {
        try {
            const idUser = localStorage.getItem('id') ?? "";
            const token = localStorage.getItem('token');
            const surveyResponse = await axios.get(`${BASE_URL}/api/survey/${surveyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (surveyResponse.data.code === 200) {
                setData(surveyResponse.data.data);
                console.log("Data Survey", surveyResponse.data.data);
            } else {
                console.log('Failed to fetch survey data');
            }

            const questionResponse = await axios.get(`${BASE_URL}/api/question`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (questionResponse.data.code === 200) {
                const filteredQuestions = questionResponse.data.data.filter((q: Question) => q.survey_id === parseInt(surveyId || '', 10));
                setQuestion(filteredQuestions);
            } else {
                console.log('Failed to fetch question data');
            }

            const answerResponse = await axios.get(`${BASE_URL}/api/answer`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (answerResponse.data.code === 200) {
                const answers = answerResponse.data.data;
                const userAnswers = answers.filter((answer: any) => answer.user_id === parseInt(idUser));
                const surveyAnswers = userAnswers.filter((answer: any) => answer.question.some((q: any) => q.survey_id === parseInt(surveyId || '', 10)));

                if (surveyAnswers.length > 0) {
                    setHaveAnswered(true);
                }
                
            } else {
                console.log('Failed to fetch answer data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isWithinDateRange = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();

        return today >= start && today <= end;
    };

    const canAccessSurvey = data && isWithinDateRange(data.tanggal_posting, data.batas_posting);

    console.log("Status Survey", canAccessSurvey);




    useEffect(() => {
        if (surveyId) {  // Ensure the id is available before fetching data
            fetchData();
        }
    }, [surveyId]);

    const handleDataChange = (id: any, value: any) => {
        setForm(prevData => ({
            ...prevData,
            [id]: value
        }));
    };
    console.log("Form Data", form);

    const handleFormSubmit = async () => {
        const formattedData = Object.keys(form).map(key => ({
            question_id: parseInt(key, 10),
            answer: form[key]
        }));

        try{
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}/api/answer`, formattedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                notifySuccsessSurvey();
                setTimeout(() => {
                    window.location.href = '/category-survey';
                }, 1500);
                console.log("data yang disimpan", formattedData);
                
            } else {
                notifyFailedSurvey();
                console.log("data yang gagal disimpan", formattedData);
            }
        } catch (error) {
            console.log(error);
            console.log("data yang eror ", formattedData);
        }
    }

    if (haveAnswered) {
        return (
            <div className="items-center justify-center flex-1  px-5 md:px-10 py-5 md:py-10 ">
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
                <div className=" md:w-2/3 mx-auto bg-white p-7 md:py-16 md:p-10 rounded-lg mb-3">
                    <h1 className="text-2xl font-semibold text-red-400 text-center">Maaf, Survey Ini Telah Anda isi</h1>
                    <p className="text-gray-500 mt-1 text-center text-sm md:text-base">Terima Kasih Karena Telah Mengisi Survey Ini.</p>
                </div>
            </div>
        );
    }

    if (!canAccessSurvey) {
        return (
            <div className="items-center justify-center flex-1  px-5 md:px-10 py-5 md:py-10 ">
                <div className=" md:w-2/3 mx-auto bg-white p-7 md:py-16 md:p-10 rounded-lg mb-3">
                    <h1 className="text-2xl font-semibold text-red-300 text-center">Maaf, Survey Ini Sudah Tidak Tersedia</h1>
                    <p className="text-gray-500 mt-1 text-center text-sm md:text-base">Masa Isi Survey Ini Belum Mulai Atau Sudah Lewat</p>
                </div>
            </div>
        );
    }


    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10 py-5 md:py-10 ">
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
            {data ? (
                <div className=" md:w-2/3 mx-auto bg-white p-7 md:p-10  rounded-lg mb-3">
                    <h1 className="text-3xl font-bold text-[#3D9ADD]">{data.title}</h1>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">Silahkan isi survey sampai dengan selesai dan pastikan anda mengisi dengan benar!!</p>
                </div> 
            ):(
                <div className="md:w-2/3 mx-auto bg-white  p-7 md:p-10   rounded-lg mb-3">
                    <h1 className="text-3xl font-bold text-[#3D9ADD]">Loading....</h1>
                </div>
            )}

            {question.map((item) => (
                <div key={item.id}>
                    {item.type === 'text' && (
                        <TextFormSurvey
                            question={item.question}
                            id={item.id}
                            onDataChange={handleDataChange}
                        />
                    )}
                    {item.type === 'long_text' && (
                        <LongTextFormSurvey
                            question={item.question}
                            id={item.id}
                            onDataChange={handleDataChange}
                        />
                    )}
                    {item.type === 'setuju_choice' && (
                        <SetujuChoise
                            question={item.question}
                            id={item.id}
                            onDataChange={handleDataChange}
                        />
                    )}
                    {item.type === 'puas_choice' && (
                        <PuasChoise
                            question={item.question}
                            id={item.id}
                            onDataChange={handleDataChange}
                        />
                    )}
                    {item.type === 'jenis_kelamin' && (
                        <JenisKelaminChoise
                            question={item.question}
                            id={item.id}
                            onDataChange={handleDataChange}
                        />
                    )}
                </div>
            ))}
            
            <div className="md:w-2/3 mx-auto bg-white p-5 md:p-7   rounded-lg flex justify-end">
                <Button onClick={handleFormSubmit}  type="submit" size="default" variant="default" className="bg-[#00B907] hover:bg-[#43a046] md:w-1/5">Submit</Button>
            </div> 
        </div>
    );
}
    
