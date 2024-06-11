import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CirclePlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Questions {

}

const Questions = ({

}: Questions) => {

    const [value, setValue] = useState('');
    const [question, setQuestion] = useState('');

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
    }

    const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(e.target.value);
    }

    useEffect(() => {
        if (value === 'jenis_kelamin') {
            setQuestion('Jenis Kelamin');
        } else {
            setQuestion('');
        }
    }, [value]);
    
    console.log("Value yang dipilih adalah", value);
    console.log("Pertanyaan yang diinput adalah", question);

return (
    <div className=" w-full bg-white p-7 md:p-10 rounded-lg my-2">
        <div className="flex justify-end">
            <Select
                onValueChange={handleValueChange}
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
            disabled={value === 'jenis_kelamin' ? true : false}
            />
        </div>
    </div>
    // <div className="mt-3 flex flex-row gap-2">
    //     <Button className="rounded-full shadow-md" variant="destructive"  size="icon">
    //         <Trash2 className=" h-4 w-4"/>
    //     </Button>
    //     <Button className="rounded-full bg-white hover:bg-gray-200 shadow-md" variant="default" size="icon">
    //         <CirclePlus className="h-5 w-5 text-[#00B907]"/>
    //     </Button>
    // </div>
    );
}

export default Questions;
