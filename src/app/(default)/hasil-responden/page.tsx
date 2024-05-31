"use client";
import React from "react";
import CardSurveyHasil from "@/components/CardSurveyHasil";

export default function page() {
    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10">
            <div className="mt-10">
                <h1 className="text-4xl font-bold text-center">Hasil Responden</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
                <CardSurveyHasil
                    title={"Survei Kinerja Dari Lulusan"}
                    id={"/hasil-responden/hasilId"}
                />
                <CardSurveyHasil
                    title={"Survei Capaian Pembelajaran Lulusan"}
                    id={"/hasil-responden/hasilId"}
                />
                <CardSurveyHasil
                    title={"Survei Visi Misi Tujuan Strategi"}
                    id={"/hasil-responden/hasilId"}
                />
                
            </div>
        </div>
    );
}
    
