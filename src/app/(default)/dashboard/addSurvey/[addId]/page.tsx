"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Questions from "@/components/questions/Questions";
import AddDelete from "@/components/questions/AddDelete";
import { usePathname } from "next/navigation";
import axios from "axios";
import BASE_URL from "../../../../../../config";


export default function page() {

    interface FormData {
        survey_id: number;
        question: string;
        type: string;
    }

    const surveyId = usePathname().split('/').pop();
    const [data, setData] = useState<any>(null);
    const [questions, setQuestions] = useState<{ count: number }[]>([]);
    const [form, setForm] = useState<FormData[]>([]);

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

    useEffect(() => {
        fetchData();
    }, []);

    const handleDataChange = (question: string, type: string, index: number) => {
        const newForm = [...form];
        newForm[index] = { survey_id: parseInt(surveyId || ""), question, type };
        setForm(newForm);
    };

    console.log("Handle data Change", form);

    const submitForm = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}/api/question`, form, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                console.log('Berhasil Menambahkan Form');
            } else {
                console.log('Gagal Menambahkan Form');
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    const handleAdd = () => {
        setQuestions([...questions, { count: questions.length }]);
        setForm([...form, { survey_id: parseInt(surveyId || ""), question: "", type: "" }]);
    };

    const handleDelete = () => {
        setQuestions(questions.slice(0, -1));
        setForm(form.slice(0, -1));
    };

    console.log(questions);
    
    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10 py-5 md:py-10">
                {data && (
                    <div className=" md:w-2/3 mx-auto bg-white p-7 md:p-10 rounded-lg">
                        <h1 className="text-3xl font-bold text-[#3D9ADD]">Kelola Survey : {data.title}</h1>
                        <p className="text-gray-500 mt-1 text-sm md:text-base">Tambahkan Pertanyaan untuk Survey {data.title}</p>
                    </div>
                )}
                <div className="flex flex-col items-center mx-auto md:w-2/3 my-3">
                    {questions.map((item, index) => (
                        <Questions
                            key={item.count}
                            onDataChange={(question, type) => handleDataChange(question, type, index)}
                        />
                    ))}
                    <AddDelete
                        count={questions.length} 
                        handleAdd={handleAdd} 
                        handleDelete={handleDelete}                        
                    />
                </div>
                

                {questions.length > 0 &&(
                    <div className="md:w-2/3 mx-auto bg-white p-5 md:p-7   rounded-lg flex justify-center">
                        <Button onClick={submitForm}   type="submit" size="default" variant="default" className="bg-[#00B907] hover:bg-[#43a046] md:w-1/5">Save Form</Button>
                    </div>
                )}
        </div>
    );
}
    
