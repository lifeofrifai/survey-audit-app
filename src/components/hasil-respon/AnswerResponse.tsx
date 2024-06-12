import axios from "axios";
import BASE_URL from "../../../config";
import { useEffect, useState } from "react";
import Text from "./Text";
import Chart from "./Chart";

interface TextResponseProps {
    question_id: number;
    question: string;
}

const TextResponse = ({
    question_id,
    question
}: TextResponseProps) => {

    const [answers, setAnswers] = useState<any>(null);


    const fetchAllAnswer = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/answer/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.code === 200) {
                // console.log("Data Answer", response.data.data.filter((answer: any) => answer.question[0].id === question_id));
                const filteredAnswers = response.data.data.filter((answer: any) => answer.question[0].id  === question_id);
                setAnswers(filteredAnswers);
                // setAnswers(response.data.data);
                // console.log("Data Answer", response.data.data);
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

    // console.log("Data Answer dengan id", question_id, "adalah", answers);




    return (
        <div className="mx-auto bg-white p-7 md:p-10  rounded-lg w-full">
            <div className="mb-5">
                <h1 className="font-semibold text-md md:text-base">Pertanyaan: </h1>
                <p className="font-bold text-base md:text-lg ">{question}</p>
            </div>
            
                {/* {answers? (
                    answers.map((answer: any, index: any) => (
                        <div key={index}>
                            {['text', 'long_text'].includes(answer.question[0].type) && (
                                <Text value={answer.answer} />
                            )}
                            {['puas_choice', 'jenis_kelamin', 'setuju_choice'].includes(answer.question[0].type) && (
                                <Chart/>
                            )}
                            
                        </div>
                        
                    ))
                ) : (
                    <p>Loading answers...</p>
                )} */}
                {answers ? (
                    (() => {
                        const renderedTypes = new Set();

                        return answers.map((answer: any, index: any) => {
                            if (['text', 'long_text'].includes(answer.question[0].type)) {
                                return (
                                    <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 ">
                                        <div key={index} className="bg-red-100">
                                            <Text value={answer.answer} />
                                        </div>
                                    </div>
                                );
                            }

                            if (['puas_choice', 'jenis_kelamin', 'setuju_choice'].includes(answer.question[0].type)) {
                                if (!renderedTypes.has(answer.question[0].type)) {
                                    renderedTypes.add(answer.question[0].type);
                                    return (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                                            <div key={index} className="w-full">
                                                <Chart id={answer.question[0].id} />
                                            </div>
                                        </div>
                                    );
                                }
                            }

                            return null;
                        });
                    })()
                ) : (
                    <p>Loading answers...</p>
                )}
        </div>
    );
}

export default TextResponse;