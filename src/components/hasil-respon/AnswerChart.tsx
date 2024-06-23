import axios from "axios";
import BASE_URL from "../../../config";
import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface AnswerChartProps {
    question_id: number;
    question: string;
    type : string;
}

const AnswerChart = ({
    question_id,
    question,
    type
}: AnswerChartProps) => {

    const [answers, setAnswers] = useState<any[]>([]);

    const [jenisKelaminLakiCount, setJenisKelaminLakiCount] = useState(0);
    const [jenisKelaminPrCount, setJenisKelaminPrCount] = useState(0);

    const [sangatPuasCount, setSangatPuasCount] = useState(0);
    const [puasCount, setPuasCount] = useState(0);
    const [cukupPuasCount, setCukupPuasCount] = useState(0);
    const [tidakPuasCount, setTidakPuasCount] = useState(0);

    const [SangatSetujuCount, setSangatSetujuCount] = useState(0);
    const [setujuCount, setSetujuCount] = useState(0);
    const [netralCount, setNetralCount] = useState(0);
    const [tidakSetujuCount, setTidakSetujuCount] = useState(0);
    const [sangatTidaksetujuCount, setSangatTidakSetujuCount] = useState(0);


    const fetchAllAnswer = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/questions/${question_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                setAnswers(response.data.data.answer);
                console.log("data answer",response.data.data.answer);
            } else {
                console.log('Gagal Mengambil data');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllAnswer();
    }, [question_id]);


    useEffect(() => {
        const lakiCount = answers.filter(answer => answer.answer === 'Laki-Laki').length;
        const prCount = answers.filter(answer => answer.answer === 'Perempuan').length;
        
        setJenisKelaminLakiCount(lakiCount);
        setJenisKelaminPrCount(prCount);
    }, [answers]);

    const chartJenisKelamin = {
        labels: ['Laki-Laki', 'Perempuan'],
        datasets: [
        {
            label: 'Jumlah Voter',
            data: [jenisKelaminLakiCount, jenisKelaminPrCount],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        },
        ],
    };

    useEffect(() => {
        const sangatPuas = answers.filter(answer => answer.answer === 'Sangat Puas').length;
        const puas = answers.filter(answer => answer.answer === 'Puas').length;
        const cukupPuas = answers.filter(answer => answer.answer === 'Cukup Puas').length;
        const tidakPuas = answers.filter(answer => answer.answer === 'Tidak Puas').length;
        
        setSangatPuasCount(sangatPuas);
        setPuasCount(puas);
        setCukupPuasCount(cukupPuas);
        setTidakPuasCount(tidakPuas);
    }, [answers]);

    const chartPuas = {
        labels: ['Sangat Puas', 'Puas', 'Cukup Puas', 'Tidak Puas'],
        datasets: [
        {
            label: 'Jumlah Voter',
            data: [sangatPuasCount, puasCount, cukupPuasCount, tidakPuasCount],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        },
        ],
    };

    useEffect(() => {
        const sangatSetuju = answers.filter(answer => answer.answer === 'Sangat Setuju').length;
        const setuju = answers.filter(answer => answer.answer === 'Setuju').length;
        const netral = answers.filter(answer => answer.answer === 'Netral').length;
        const tidakSetuju = answers.filter(answer => answer.answer === 'Tidak Setuju').length;
        const sangatTidakSetuju = answers.filter(answer => answer.answer === 'Sangat Tidak Setuju').length;
        
        setSangatSetujuCount(sangatSetuju);
        setSetujuCount(setuju);
        setNetralCount(netral);
        setTidakSetujuCount(tidakSetuju);
        setSangatTidakSetujuCount(sangatTidakSetuju);
    }, [answers]);

    const chartSetuju = {
        labels: ['Sangat Setuju', 'Setuju','Netral', 'Tidak Setuju', 'Sangat Tidak Setuju'],
        datasets: [
        {
            label: 'Jumlah Voter',
            data: [SangatSetujuCount, setujuCount, netralCount, tidakSetujuCount, sangatTidaksetujuCount],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        },
        ],
    };
    





    return (
        <div className="mx-auto bg-white p-7 md:p-10  rounded-lg w-full">
            <div className="mb-5">
                <h1 className="font-semibold text-md md:text-base">Pertanyaan: </h1>
                <p className="font-bold text-base md:text-lg ">{question}</p>
            </div>
            <div className="md:w-1/3">
                {type === 'jenis_kelamin' && (
                    <Pie data={chartJenisKelamin} />
                )}
                {type === 'puas_choice' && (
                    <Pie data={chartPuas} />
                )}
                {type === 'setuju_choice' && (
                    <Pie data={chartSetuju} />
                )}
            </div>
        </div>
        
    );
}

export default AnswerChart;