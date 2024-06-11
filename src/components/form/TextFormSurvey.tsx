import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

interface TextFormSurvey {
    question: string;
    id: any;
    onDataChange: (id: string, value: string) => void;
}

const TextFormSurvey = ({
    question,
    id,
    onDataChange
}: TextFormSurvey) => {

    const [text, setText] = useState('');
    
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        onDataChange(id, e.target.value);
    }
    return (
        <div className="md:w-2/3 mx-auto bg-white p-7 md:p-10   pb-12 rounded-lg my-5">
            <Label htmlFor={`txtFormSurvey${id}`} className="text-md">{question}</Label>
            <Input 
                className="mt-3 "
                type="text" 
                id={`txtFormSurvey${id}`}
                placeholder="Jawaban Anda" 
                value={text}
                onChange={handleTextChange}
                required 
            />
        </div>  
    );
}

export default TextFormSurvey;