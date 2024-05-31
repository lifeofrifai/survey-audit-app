"use client";

import React from "react";
import CardSurvey from "@/components/CardSurvey";



export default function page() {
    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10">
            <div className="mt-10">
                <h1 className="text-4xl font-bold text-center">Selamat datang di web survei AMI dan Akreditasi!</h1>
                <p className="text-center">Silahkan pilih kategori survei</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
                <CardSurvey
                    title={"Survei Kinerja Dari Lulusan"}
                    id={"/category-survey/surveyId"}
                />
                <CardSurvey
                    title={"Survei Capaian Pembelajaran Lulusan"}
                    id={"/category-survey/surveyId"}
                />
                <CardSurvey
                    title={"Survei Visi Misi Tujuan Strategi"}
                    id={"/category-survey/surveyId"}
                />
                
            </div>
        </div>
    );
}
    
