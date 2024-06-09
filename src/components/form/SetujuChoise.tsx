import { Label } from "../ui/label";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface SetujuChoise {
    question: string;
    id: any;
}

const SetujuChoise = ({
    question,
    id
}: SetujuChoise) => {

    const [value, setValue] = useState('');

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
    }

    console.log("Value yang dipilih adalah", value);

    return (
        <div className="md:w-2/3 mx-auto bg-white p-7 md:p-10  pb-12 rounded-lg my-3">
            <Label htmlFor="Skala" className="text-md">{question}</Label>
            <RadioGroup
                className="gap-4 mt-3"
                value={value}
                onValueChange={handleValueChange}
            >
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Sangat Setuju" id={`ss-${id}`} />
                    <Label htmlFor={`ss-${id}`} >Sangat Setuju</Label>
                </div>
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Setuju" id={`s-${id}`}  />
                    <Label htmlFor={`s-${id}`} >Setuju</Label>
                </div>
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Netral" id={`n-${id}`}  />
                    <Label htmlFor={`n-${id}`} >Netral</Label>
                </div>
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Tidak Setuju" id={`ts-${id}`}  />
                    <Label htmlFor={`ts-${id}`} >Tidak Setuju</Label>
                </div>
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Sangat Tidak Setuju" id={`sts-${id}`}  />
                    <Label htmlFor={`sts-${id}`} >Sangat Tidak Setuju</Label>
                </div>
            </RadioGroup>
        </div>  
    );
}

export default SetujuChoise;
