import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CirclePlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Questions {
    onDataChange: (question: string, type: string) => void;
}

const Questions = ({
    onDataChange
}: Questions) => {

    const [type, setType] = useState('');
    const [question, setQuestion] = useState('');

    const handleTypeChange = (e: string) => {
        setType(e);
    }

    const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(e.target.value);
    }

    useEffect(() => {
        if (type === 'jenis_kelamin') {
            const prefilledQuestion = 'Jenis Kelamin';
            setQuestion(prefilledQuestion);
            onDataChange(prefilledQuestion, type);
        } else {
            onDataChange(question, type);
        }
    }, [type, question]);
    
    console.log("Type yang dipilih adalah", type);
    console.log("Question yang diinput adalah", question);

return (
    <div className=" w-full bg-white p-7 md:p-10 rounded-lg my-2">
        <div className="flex justify-end">
            <Select
                onValueChange={handleTypeChange}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Jenis Form" />
                </SelectTrigger>
                <SelectContent >
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="long_text">Long Text</SelectItem>
                    <SelectItem value="jenis_kelamin">Gender Selection</SelectItem>
                    <SelectItem value="puas_choice">Kepuasan Choice</SelectItem>
                    <SelectItem value="setuju_choice">Setuju Choice</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="mt-3">
            <Textarea
            className=""
            placeholder="Masukan Pertanyaan"
            value={question}
            onChange={handleQuestionChange}
            disabled={type === 'jenis_kelamin' ? true : false}
            />
        </div>
    </div>
    );
}

export default Questions;
