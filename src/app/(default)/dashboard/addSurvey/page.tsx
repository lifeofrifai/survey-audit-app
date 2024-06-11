"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, Trash2 } from "lucide-react"



export default function page() {
    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10 py-5 md:py-10">
                <div className=" md:w-2/3 mx-auto bg-white p-7 md:p-10 rounded-lg">
                    <h1 className="text-3xl font-bold text-[#3D9ADD]">Buat Survey:</h1>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">Silahkan isi survey sampai dengan selesai dan pastikan anda mengisi dengan benar!!</p>
                </div> 

                <div className="flex flex-col items-center mx-auto md:w-2/3   my-5">
                    <div className=" w-full bg-white p-7 md:p-10 rounded-lg ">
                        <div className="flex justify-end">
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Pilih Jenis Form" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="long_text">Long Text</SelectItem>
                                    <SelectItem value="jenis_kelamin">Gender Selection</SelectItem>
                                    <SelectItem value="puas_choice">Kepuasan Choice</SelectItem>
                                    <SelectItem value="setuju_choice">Setuju Choice</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Textarea
                            className="mt-2"
                            placeholder="Masukan Pertanyaan"
                            />
                        </div>
                    </div>
                    <div className="mt-3 flex flex-row gap-2">
                        <Button className="rounded-full bg-white hover:bg-gray-200" variant="default" size="icon">
                            <CirclePlus className="h-5 w-5 text-[#00B907]"/>
                        </Button>
                        <Button className="rounded-full " variant="destructive"  size="icon">
                            <Trash2 className=" h-4 w-4"/>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center mx-auto md:w-2/3   my-5">
                    <div className=" w-full bg-white p-7 md:p-10 rounded-lg ">
                        <div className="flex justify-end">
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Pilih Jenis Form" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="long_text">Long Text</SelectItem>
                                    <SelectItem value="jenis_kelamin">Gender Selection</SelectItem>
                                    <SelectItem value="puas_choice">Kepuasan Choice</SelectItem>
                                    <SelectItem value="setuju_choice">Setuju Choice</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Textarea
                            className="mt-2"
                            placeholder="Masukan Pertanyaan"
                            />
                        </div>
                    </div>
                    <div className="mt-3 flex flex-row gap-2">
                        <Button className="rounded-full bg-white hover:bg-gray-200" variant="default" size="icon">
                            <CirclePlus className="h-5 w-5 text-[#00B907]"/>
                        </Button>
                        <Button className="rounded-full " variant="destructive"  size="icon">
                            <Trash2 className=" h-4 w-4"/>
                        </Button>
                    </div>
                </div>

                <div className="md:w-2/3 mx-auto bg-white p-5 md:p-7   rounded-lg flex justify-end">
                    <Button   type="submit" size="default" variant="default" className="bg-[#00B907] hover:bg-[#43a046] md:w-1/5">Submit</Button>
                </div> 
            {/* <form action="">
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
            </form> */}
        </div>
    );
}
    
