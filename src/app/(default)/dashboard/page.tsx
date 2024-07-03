"use client";

import React, { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import BASE_URL from "../../../../config";
import { CirclePlus, Trash2 } from "lucide-react"
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DatePicker  from "@/components/ui/date-picker";



export default function page() {

    const blockUser = () => {
        const user = localStorage.getItem('user');
        if (user === 'ADMIN') {
            return true;
        } else {
            window.history.back();
        }
    }

    interface Survey {
        id: number;
        title: string;
        question: string;
    }

    const [data, setData] = useState<Survey[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchData = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/survey`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
        });
            if (response.data.code === 200) {
            setData(response.data.data);
            setLoading(false);
            } else {
            console.log('Gagal Mengambil data');
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log(data);

    useEffect(() => {
        blockUser();
        fetchData();
    }, []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleStartDateChange = (date: string) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: string) => {
        setEndDate(date);
    };

    const handleNewSurvey = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = axios.post(`${BASE_URL}/api/survey`, {
                title,
                tanggal_posting: startDate,
                batas_posting: endDate
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if ((await response).data.code === 200) {
                const surveyId = (await response).data.data.id;
                if (surveyId) {
                    window.location.href = `/dashboard/addSurvey/${surveyId}`;
                } else {
                    console.log('Survey ID not found in the response');
                }

            } else {
                console.log('Gagal membuat survey');
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log("Title", title);
    console.log("Start Date", startDate);
    console.log("End Date", endDate);



    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10">
            <div className="mt-10">
                <h1 className="text-4xl font-bold text-center">Dashboard Admin Survey</h1>
            </div>

            <div className=" mt-24">
                <div className="w-30 mb-5 flex flex-row justify-end bg-white p-5 rounded-lg">
                    <Button onClick={() => setOpen(true)} type="button" size="default" variant="default" className="bg-[#00B907] hover:bg-[#43a046]">
                        <CirclePlus className="mr-2 h-4 w-4"/>
                        Create Survey
                    </Button>
                    <React.Fragment >
                        <Modal open={open} onClose={() => setOpen(false)} sx={{zIndex: 99999}}>
                            <ModalDialog variant="outlined" role="alertdialog" sx={{width: 500}}>
                                <div className="w-full p-3 flex flex-col gap-3">
                                    <div>
                                        <Label  className="text-lg font-semibold">Nama Survey</Label>
                                        <Input 
                                            type="text" 
                                            className="w-full mt-1" 
                                            placeholder="Masukan Nama Survey"
                                            value={title}
                                            onChange={handleTitleChange}
                                            
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-lg font-semibold ">Tanggal Mulai Survey</Label>
                                        <DatePicker onSelectDate={handleStartDateChange}/>
                                    </div>
                                    <div>
                                        <Label className="text-lg font-semibold ">Tanggal Berakhir Survey</Label>
                                        <DatePicker onSelectDate={handleEndDateChange}/>
                                    </div>
                                    
                                    
                                </div>
                                
                            <DialogActions>
                                <Button onClick={handleNewSurvey} variant="default" className="bg-[#00B907] hover:bg-[#43a046]">
                                    <CirclePlus className="mr-2 h-4 w-4"/>
                                    Buat Survey
                                </Button>
                                <Button variant="destructive"  onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                            </DialogActions>
                            </ModalDialog>
                        </Modal>
                    </React.Fragment>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 bg-white p-5 rounded-lg">
                    {data.map((item) => (
                        <DashboardCard
                                key={item.id}
                                title={item.title}
                                id={item.id}
                            />
                    ))}
                </div>
            </div>
        </div>
    );
}
    
