"use client";
import React, { useEffect, useState } from "react";
import CardSurveyHasil from "@/components/CardSurveyHasil";
import axios from "axios";
import BASE_URL from "../../../../config";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function page() {

    interface Survey {
        id: number;
        title: string;
        batas_posting: string;
        created_at: string;
        role: string;
        tanggal_posting: string;
        updated_at: string;
    }

    const [data, setData] = useState<Survey[]>([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState<string>('');
    const [years, setYears] = useState<string[]>([]);  // Store available years

    const fetchData = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/survey`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                const surveys = response.data.data;
                setData(surveys);
                setLoading(false);

                // Extract years from batas_posting and created_at
                const yearsSet = new Set<string>();
                surveys.forEach((survey: Survey) => {
                    const batasPostingYear = new Date(survey.batas_posting).getFullYear().toString();
                    const createdAtYear = new Date(survey.created_at).getFullYear().toString();
                    yearsSet.add(batasPostingYear);
                    yearsSet.add(createdAtYear);
                });
                setYears(Array.from(yearsSet).sort());  // Convert to array and sort
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

    const filteredData = year ? data.filter((survey) => {
        const surveyYear = new Date(survey.batas_posting).getFullYear().toString();
        return surveyYear === year;
    }) : data;

    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10">
            <div className="mt-10">
                <h1 className="text-4xl font-bold text-center">Hasil Survey</h1>
            </div>
            <div className="w-30 mb-5 flex flex-row justify-end bg-white p-5 rounded-lg mt-8">
                <div className="flex items-center">
                    <Select onValueChange={setYear} value={year}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filter by Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((yearOption) => (
                                <SelectItem key={yearOption} value={yearOption}>{yearOption}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {filteredData.map((item) => (
                    <CardSurveyHasil
                        key={item.id}
                        title={item.title}
                        id={`/hasil-responden/${item.id}`}
                    />
                ))}
            </div>
        </div>
    );
}
