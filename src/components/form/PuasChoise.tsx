import { Label } from "../ui/label";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface PuasChoise {
    question: string;
    id: any;
    onDataChange: (id: string, value: string) => void;
}

const PuasChoise = ({
    question,
    id,
    onDataChange

}: PuasChoise) => {

    const [value, setValue] = useState('');

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        onDataChange(id, newValue);
    }

    console.log("Value yang dipilih adalah", value);

    return (
        <div className="md:w-2/3 mx-auto bg-white p-7 md:p-10   pb-12 rounded-lg my-5">
            <Label htmlFor="Skala" className="text-md">{question}</Label>
            <RadioGroup
                className="gap-4 mt-3"
                value={value}
                onValueChange={handleValueChange}
            >
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Sangat Puas" id={`sp-${id}`} />
                    <Label htmlFor={`sp-${id}`}>Sangat Puas</Label>
                </div>
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Puas" id={`p-${id}`} />
                    <Label htmlFor={`p-${id}`}>Puas</Label>
                </div>
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Cukup Puas" id={`cp-${id}`} />
                    <Label htmlFor={`cp-${id}`}>Cukup Puas</Label>
                </div>
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Tidak Puas" id={`tp-${id}`} />
                    <Label htmlFor={`tp-${id}`}>Tidak Puas</Label>
                </div>
            </RadioGroup>
        </div>  
    );
}

export default PuasChoise;
