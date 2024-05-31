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
        <div className="bg-[#0B62A0] px-10 py-20 rounded-lg shadow-md items-end w-full">
            <div className="w-20 h-20 mx-auto ">
                <div className="mx-auto">
                    <FaClipboardList size={80} color="white" />
                </div>
            </div>
            <div className=" p-2  items-center mt-5 justify-between">
                <div>
                    <p className="text-2xl font-bold text-white text-center">{title}</p>
                </div>
                <div className="mt-5">
                    <Link href={id}>
                        <Button size={"default"} variant={"default"} className="bg-[#FFE712] hover:bg-[#bcb042] w-full text-black" >Isi Survey</Button>
                    </Link>
                </div>
            </div>
            
            
        </div>
    );
}

export default CardSurvey;