import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import BASE_URL from '../../../config';



ChartJS.register(ArcElement, Tooltip, Legend);

export const dataChartJenisKelamin = {
    labels: ['Laki-Laki', 'Perempuan'],
    datasets: [
    {
        label: 'Jumlah Voter',
        data: [12, 19],
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

export const dataChartPuas = {
    labels: ['Laki-Laki', 'Perempuan'],
    datasets: [
    {
        label: 'Jumlah Voter',
        data: [12, 19],
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

export const dataChartSetuju = {
    labels: ['Laki-Laki', 'Perempuan'],
    datasets: [
    {
        label: 'Jumlah Voter',
        data: [12, 19],
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


interface ChartProps {
    id : any;
}

const Chart = ({
    id

}: ChartProps) => {


    const [answers, setAnswers] = useState<any>(null);
    const question_id = id;

    const fetchAllAnswer = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/answer/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                const filteredAnswers = response.data.data.filter((answer: any) => answer.question[0].id  === question_id);
                setAnswers(filteredAnswers);
                console.log("Filtered Answer", filteredAnswers);
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

    return (
        <Pie data={dataChartJenisKelamin} />
    );
}

export default Chart;