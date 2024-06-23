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
    const notifySuccsessSurvey = () => toast.success('Survey Berhasil diisi!');
    const notifyFailedSurvey = () => toast.error('Survey Gagal diisi!');

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
            } else {
                console.log('Gagal Mengambil data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDataQuestion = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/question`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                const filteredQuestions = response.data.data.filter((q: Question) => q.survey_id === parseInt(surveyId || '', 10));
                setQuestion(filteredQuestions);
                console.log(filteredQuestions);
            } else {
                console.log('Gagal Mengambil data');
            }
        } catch (error) {
            console.log(error);
        }
    }

   useEffect(() => {
        if (surveyId) {  // Ensure the id is available before fetching data
            fetchData();
            fetchDataQuestion();
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
    
