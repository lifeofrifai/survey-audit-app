"use client";
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React from 'react';
import BASE_URL from '../../../../../../config';
import { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
    const surveyId = usePathname().split('/').pop();
    const [questions, setQuestions] = useState<any[]>([]);
    const [title, setTitle] = useState<string>();
    const [typeSurvey, setTypeSurvey] = useState<string>('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleStartDateChange = (date: string) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: string) => {
        setEndDate(date);
    };

    const handleTypeSurveyChange = (value: string) => {
        setTypeSurvey(value);
    };

    const handleQuestionChange = (index: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleTypeChange = (index: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].type = value;
        setQuestions(updatedQuestions);
    };

    const updateQuestion = async (question: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${BASE_URL}/api/question/${question.id}`, {
                id: question.id,
                question: question.question,
                type: question.type,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                console.log('Pertanyaan berhasil diperbarui');
                console.log(question.id);
                console.log(question.survey_id);
                console.log(question.question);
            } else {
                console.log('Gagal memperbarui pertanyaan');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveChanges = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.put(`${BASE_URL}/api/survey/${surveyId}`, {
                title: title,
                role: typeSurvey,
                tanggal_posting: startDate,
                batas_posting: endDate,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                console.log('Survey berhasil diperbarui');
                const notify = () => toast.success('Survey berhasil diperbarui!');
                notify();
            } else {
                console.log('Gagal memperbarui survey');
            }
        } catch (error) {
            console.log(error);
        }

        for (let i = 0; i < questions.length; i++) {
            await updateQuestion(questions[i]);
        }
        

        
    };

    const getSurveyData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/survey/${surveyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                setTitle(response.data.data.title);
                setTypeSurvey(response.data.data.role);
                setStartDate(response.data.data.tanggal_posting);
                setEndDate(response.data.data.batas_posting);
            } else {
                console.log('Gagal Mengambil data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getQuestionData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/question`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                const filteredQuestions = response.data.data.filter((question: any) => question.survey_id === parseInt(surveyId || ""));
                setQuestions(filteredQuestions); // Store the filtered questions in state
            } else {
                console.log('Gagal Mengambil data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSurveyData();
        getQuestionData();
    }, []);

    return (
        <div className='items-center justify-center flex-1 px-5 md:px-10 py-5 md:py-10'>
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
            <div className=" w-3/5 bg-white p-7 md:p-10 rounded-lg my-2 mx-auto flex flex-col gap-3">
                <h1 className="text-2xl font-bold">Edit Survey</h1>
                <div className=''>
                    <Label className="text-lg font-semibold">Nama Survey</Label>
                    <Input 
                        type="text" 
                        className="w-full mt-1" 
                        placeholder="Masukan Nama Survey"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <Label className="text-lg font-semibold">Masukan Tujuan Survey</Label>
                    <Select
                        onValueChange={handleTypeSurveyChange}
                        value={typeSurvey}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Tujuan" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value="MAHASISWA">Mahasiswa</SelectItem>
                            <SelectItem value="ALUMNI">Alumni</SelectItem>
                            <SelectItem value="DOSEN">Dosen</SelectItem>
                            <SelectItem value="PENGGUNA_ALUMNI">Pengguna Alumni</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="text-lg font-semibold ">Tanggal Mulai Survey</Label>
                    <DatePicker onSelectDate={handleStartDateChange} baseDate={startDate}/>
                </div>
                <div>
                    <Label className="text-lg font-semibold ">Tanggal Berakhir Survey</Label>
                    <DatePicker onSelectDate={handleEndDateChange} baseDate={endDate}/>
                </div>
            </div>
            <div className=" w-3/5 bg-white p-7 md:p-10 rounded-lg my-2 mx-auto flex flex-col gap-3 mt-5">
                <h1 className="text-2xl font-bold mb-2">Edit Pertanyaan</h1>
                {questions.map((question, index) => (
                <div className='bg-gray-50 p-2 rounded-lg' key={question.id}>
                    <div className="flex justify-end items-center">
                        <Select
                            onValueChange={(value) => handleTypeChange(index, value)}
                            value={question.type}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Pilih Jenis Form" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="text">Text Singkat</SelectItem>
                                <SelectItem value="long_text">Text Panjang</SelectItem>
                                <SelectItem value="jenis_kelamin">Jenis Kelamin</SelectItem>
                                <SelectItem value="puas_choice">Tingkat Kepuasan</SelectItem>
                                <SelectItem value="setuju_choice">Pilihan Setuju</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mt-3">
                        <Textarea
                        className=""
                        placeholder="Masukan Pertanyaan"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(index, e)}
                        disabled={question.type === 'jenis_kelamin' ? true : false}
                        />
                    </div>
                </div>
                ))}
            </div>
            <div className="flex justify-end mt-5 w-3/5  mx-auto">
                <Button onClick={handleSaveChanges}  type="submit" size="default" variant="default" className="bg-[#00B907] hover:bg-[#43a046] md:w-1/5">Submit</Button>
            </div>
        </div>
    );
};

export default Page;
