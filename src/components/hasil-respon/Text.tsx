import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


interface TextProps {
    value: string;
}

const Text = ({
    value
}: TextProps) => {
    return (
        <div className="p-2 outline outline-gray-300 bg-white rounded-md text-center">
            {value}
        </div>
    );
}

export default Text;