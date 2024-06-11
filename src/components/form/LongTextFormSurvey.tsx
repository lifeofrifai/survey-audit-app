import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface LongTextFormSurvey {
    question: string;
    id: any;
    onDataChange: (id: string, value: string) => void;
}

const LongTextFormSurvey = ({
    question,
    id,
    onDataChange
}: LongTextFormSurvey) => {

    const [text, setText] = useState('');
    
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        onDataChange(id, e.target.value);
    }
    return (
        <div className="md:w-2/3 mx-auto bg-white p-7 md:p-10   pb-12 rounded-lg my-3">
            <Label htmlFor={`longTxtFormSurvey${id}`} className="text-md">{question}</Label>
            <Textarea 
                className="mt-3 h-8"
                id={`longTxtFormSurvey${id}`}
                placeholder="Jawaban Anda" 
                value={text}
                onChange={handleTextChange}
                required 
            />
        </div>  
    );
}

export default LongTextFormSurvey;