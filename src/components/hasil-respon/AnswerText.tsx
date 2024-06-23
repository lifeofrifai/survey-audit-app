import axios from "axios";
import BASE_URL from "../../../config";
import { useEffect, useState } from "react";

interface AnswerTextProps {
    question_id: number;
    question: string;
}

const AnswerText = ({
    question_id,
    question
}: AnswerTextProps) => {

    const [answers, setAnswers] = useState<any[]>([]);


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





    return (
        <div className="mx-auto bg-white p-7 md:p-10  rounded-lg w-full">
            <div className="mb-5">
                <h1 className="font-semibold text-md md:text-base">Pertanyaan: </h1>
                <p className="font-bold text-base md:text-lg ">{question}</p>
            </div>
            <div className="grid md:grid-cols-4 gap-3">
                {answers && answers.length > 0 ? (
                    answers.map((answer: any, index: number) => (
                        <div key={index} className="p-2 outline outline-gray-300 bg-white rounded-md text-center">
                            {answer.answer}
                        </div>
                    ))
                ) : (
                    <p>No Data</p>
                )}
            </div>
        </div>
        
    );
}

export default AnswerText;