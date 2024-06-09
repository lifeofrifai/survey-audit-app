import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

interface TextFormSurvey {
    question: string;
    id: any;
}

const TextFormSurvey = ({
    question,
    id
}: TextFormSurvey) => {

    const [text, setText] = useState('');
    
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }
    return (
        <div className="md:w-2/3 mx-auto bg-white p-7 md:p-10   pb-12 rounded-lg my-3">
            <Label htmlFor="txtFormSurvey" className="text-md">{question}</Label>
            <Input 
                className="mt-3"
                type="text" 
                id="txtFormSurvey" 
                placeholder="Jawaban Anda" 
                value={text}
                onChange={handleTextChange}
                required 
            />
        </div>  
    );
}

export default TextFormSurvey;