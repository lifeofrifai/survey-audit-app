import { FaClipboardList } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import { PenLine, Trash2 } from "lucide-react"

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
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Button variant="secondary" size="sm" className="bg-yellow-400">
                    <PenLine className="mr-2 h-4 w-4"/>
                    Update
                </Button>
                <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4"/>
                    Delete
                </Button>
            </div>       
        </div>
    );
}

export default CardSurvey;