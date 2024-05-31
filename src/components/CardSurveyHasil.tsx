import Link from "next/link";
import { Button } from "./ui/button";
import { FaClipboardList  } from "react-icons/fa";

interface CardSurveyHasil {
    title: string;
    id: any;
}

const CardSurvey = ({
    title,
    id
}: CardSurveyHasil) => {
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
                        <Button size={"default"} variant={"default"} className="bg-[#85ED00] hover:bg-[#86ed00ce] w-full text-black" >Lihat Hasil Survey</Button>
                    </Link>
                </div>
            </div>
            
            
        </div>
    );
}

export default CardSurvey;