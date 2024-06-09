import { Label } from "../ui/label";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface JenisKelaminChoise {
    id: any;
}

const JenisKelaminChoise = ({
    id
}: JenisKelaminChoise) => {

    const [value, setValue] = useState('');

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
    }

    console.log("Value yang dipilih adalah", value);

    return (
        <div className="md:w-2/3 mx-auto bg-white p-7 md:p-10 pb-12 rounded-lg my-3">
            <Label htmlFor="" className="text-md">Jenis kelamin</Label>
            <RadioGroup 
                className="gap-4 mt-3"
                value={value}
                onValueChange={handleValueChange}
            >
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Laki-Laki" id={`laki-${id}`} />
                    <Label htmlFor={`laki-${id}`}>Laki-Laki</Label>
                </div>
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Perempuan" id={`perempuan-${id}`} />
                    <Label htmlFor={`perempuan-${id}`}>Perempuan</Label>
                </div>
            </RadioGroup>
        </div>
    );
}

export default JenisKelaminChoise;
