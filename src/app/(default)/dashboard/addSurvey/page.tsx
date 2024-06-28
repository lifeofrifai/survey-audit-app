"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Questions from "@/components/questions/Questions";
import AddDelete from "@/components/questions/AddDelete";


export default function page() {

    const [questions, setQuestions] = useState<{ count: number }[]>([]);

    const handleAdd = () => {
        setQuestions([...questions, { count: questions.length }]);
    };

    const handleDelete = () => {
        setQuestions(questions.slice(0, -1));
    };

    console.log(questions);
    
    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10 py-5 md:py-10">
                <div className=" md:w-2/3 mx-auto bg-white p-7 md:p-10 rounded-lg">
                    <h1 className="text-3xl font-bold text-[#3D9ADD]">Buat Survey:</h1>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">Silahkan isi survey sampai dengan selesai dan pastikan anda mengisi dengan benar!!</p>
                </div> 
                <div className="flex flex-col items-center mx-auto md:w-2/3 my-3">
                    {questions.map((item) => (
                        <Questions
                            key={item.count} onDataChange={function (question: string, type: string): void {
                                throw new Error("Function not implemented.");
                            } }                        />
                    ))}
                    <AddDelete
                        count={questions.length} 
                        handleAdd={handleAdd} 
                        handleDelete={handleDelete}                        
                    />
                </div>
                

                {questions.length > 0 &&(
                    <div className="md:w-2/3 mx-auto bg-white p-5 md:p-7   rounded-lg flex justify-center">
                        <Button   type="submit" size="default" variant="default" className="bg-[#00B907] hover:bg-[#43a046] md:w-1/5">Save Form</Button>
                    </div>
                )}
        </div>
    );
}
    
