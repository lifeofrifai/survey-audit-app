"use client";

import React from "react";
import { usePathname } from "next/navigation";



export default function page() {
    
    const surveyId = usePathname().split('/').pop();


    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10 inset-0 -z-10  w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="mt-10">
                <h1 className="text-4xl font-bold text-center">Survey Kinerja Lulusan</h1>
            </div>
            <div className=" mt-14 bg-blue-300 h-full mx-10 p-10 rounded-lg">
                heaasa
            </div>
        </div>
    );
}
    
