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
    labels: ['Sangat Puas', 'Puas', 'Cukup Puas', 'Tidak Puas'],
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
    labels: ['Sangat Setuju', 'Setuju','Netral', 'Tidak Setuju', 'Sangat Tidak Setuju'],
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

    const countChartData = (filteredAnswers: any[]) => {
        let laki = 0;
        let pr = 0;
        let Sangatpuas = 0;
        let puas = 0;
        let cukupPuas = 0;
        let tidakPuas = 0;
        let sangatSetuju = 0;
        let setuju = 0;
        let netral = 0;
        let tidakSetuju = 0;
        let sangatTidakSetuju = 0;

        filteredAnswers.forEach((answer) => {
            const questionType = answer.question[0].type;
            if (questionType === 'jenis_kelamin') {
                if (answer.answer === 'Laki-Laki') {
                    laki++;
                } else {
                    pr++;
                }
            } else if (questionType === 'puas_choice') {
                if (answer.answer === 'Sangat Puas') {
                    Sangatpuas++;
                } else if (answer.answer === 'Puas') {
                    puas++;
                } else if (answer.answer === 'Cukup Puas') {
                    cukupPuas++;
                } else {
                    tidakPuas++;
                }
            } else if (questionType === 'setuju_choice') {
                if (answer.answer === 'Sangat Setuju') {
                    sangatSetuju++;
                } else if (answer.answer === 'Setuju') {
                    setuju++;
                } else if (answer.answer === 'Netral') {
                    netral++;
                } else if (answer.answer === 'Tidak Setuju') {
                    tidakSetuju++;
                } else {
                    sangatTidakSetuju++;
                }
            }
        });

        setJenisKelaminLakiCount(laki);
        setJenisKelaminPrCount(pr);
        setSangatPuasCount(Sangatpuas);
        setPuasCount(puas);
        setCukupPuasCount(cukupPuas);
        setTidakPuasCount(tidakPuas);
        setSangatSetujuCount(sangatSetuju);
        setSetujuCount(setuju);
        setNetralCount(netral);
        setTidakSetujuCount(tidakSetuju);
        setSangatTidakSetujuCount(sangatTidakSetuju);
    };
    // console.log("Jenis Kelamin Laki", jenisKelaminLakiCount);
    // console.log("Jenis Kelamin Perempuan", jenisKelaminPrCount);
    // console.log("Sangat Puas", sangatPuasCount);
    // console.log("Puas", puasCount);
    // console.log("Cukup Puas", cukupPuasCount);
    // console.log("Tidak Puas", tidakPuasCount);

    useEffect(() => {
        fetchAllAnswer();
    }, [question_id]);
    
    useEffect(() => {
        if (answers) {
            countChartData(answers);
        }
    }, [answers]);



    if (!answers || answers.length === 0 || !answers[0].question) {
        return null; // Or any loading indicator you prefer
    }

    const questionType = answers[0].question[0].type;

    if (questionType === 'jenis_kelamin') {
        return <Pie data={dataChartJenisKelamin} />;
    } else if (questionType === 'puas_choice') {
        return <Pie data={dataChartPuas} />;
    } else if (questionType === 'setuju_choice') {
        return <Pie data={dataChartSetuju} />;
    }
    
}

export default Chart;