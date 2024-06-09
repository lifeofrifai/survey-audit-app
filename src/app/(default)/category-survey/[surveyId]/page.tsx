"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import BASE_URL from "../../../../../config";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


export default function page() {

    interface Question {
        id: number;
        survey_id: number;
        question: string;
    }

    
    const surveyId = usePathname().split('/').pop();
    const [data, setData] =  useState<any>(null);

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

    const [question, setQuestion] = useState<Question[]>([]);

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



    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10 ">
            <div className="mt-10">
                {data ? (
                    <h1 className="text-4xl font-bold text-center">{data.title}</h1>
                    
                ):(
                    <h1 className="text-4xl font-bold text-center">Loading...</h1>
                )}
                
            </div>
            <div className=" mt-14 mx-10 p-10 rounded-lg">
                {question.map((item) => (
                    <div className="mb-5" key={item.id}>
                        <p className="text-xl font-bold">{item.question}</p>
                        <input type="text" className="w-full h-10 border border-gray-400 rounded-lg px-3 mt-2"/>
                    </div>
                ))}
            </div>
            <div className="w-2/3 mx-auto bg-slate-100  p-10 pb-12 rounded-lg mb-2">
                <Label htmlFor="jawaban" className="text-md">Nama lengkap</Label>
                <Input 
                    className="mt-3"
                    type="email" 
                    id="jawaban" 
                    placeholder="Jawaban Anda" 
                    value={""} 
                    required 
                />
            </div>  
            <div className="w-2/3 mx-auto bg-slate-100  p-10 pb-12 rounded-lg ">
                <Label htmlFor="" className="text-md">Jenis kelamin</Label>
                <RadioGroup defaultValue="option-one" className="gap-4 mt-3">
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Option One</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Option Two</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem value="option-three" id="option-three" />
                        <Label htmlFor="option-three">Option Three</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">Option Four</Label>
                    </div>
                </RadioGroup>

            </div>  
        </div>
    );
}
    
