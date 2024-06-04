import { FaClipboardList } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";

interface CardSurvey {
    title: string;
    id : any;
}

const CardSurvey = ({
    title,
    id,
}: CardSurvey) => {
    return (
        <div className="bg-[#0B62A0] w-full py-6 px-8 rounded-lg flex flex-row justify-between mb-5">
            <div>
                <p className="text-white font-semibold text-xl">{title}</p>
                <p className="text-white">Jumlah Responden : 12</p>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <p>delete</p>
                <p>edit</p>
            </div>       
        </div>
    );
}

export default CardSurvey;