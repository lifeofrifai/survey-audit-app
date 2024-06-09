"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";



export default function page() {
    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10 ">
            <div className="mt-10">
                <h1 className="py-2 px-9 text-2xl md:text-3xl font-extrabold text-[#00726B]">Buat Survey Baru</h1>
            </div>
            <form action="">
                <div className=" mt-14 bg-gray-100  mx-10 p-10 rounded-lg">
                    <div className="grid w-full  items-center gap-1.5">
                        <Label  htmlFor="Nama Survey" className="text-lg">Masukan Nama Survey</Label>
                        <Input 

                            type="text" 
                            id="namaSurvey" 
                            placeholder="Contoh: Survey Kepuasan Alumni" 
                            value={undefined} 
                            onChange={undefined} 
                            required 
                        />
                    </div>
                </div>
                <div className=" mt-14 bg-gray-100  mx-10 p-10 rounded-lg">
                    <div className="grid w-full  items-center gap-1.5">
                        <Label  htmlFor="Nama Survey" className="text-lg">Masukan Nama Survey</Label>
                        <Input 

                            type="text" 
                            id="namaSurvey" 
                            placeholder="Contoh: Survey Kepuasan Alumni" 
                            value={undefined} 
                            onChange={undefined} 
                            required 
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
    
