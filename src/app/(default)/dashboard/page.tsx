"use client";

import React, { useEffect } from "react";
import DashboardCard from "@/components/DashboardCard";
import {Button} from "@/components/ui/button";
import Link from "next/link";


export default function page() {

    const blockUser = () => {
        const user = localStorage.getItem('user');
        if (user === 'ADMIN') {
            return true;
        } else {
            window.history.back();
        }
    }

    useEffect(() => {
        blockUser();
    }, []);

    return (
        <div className="items-center justify-center flex-1 px-5 md:px-10">
            <div className="mt-10">
                <h1 className="text-4xl font-bold text-center">Dashboard Survey</h1>
            </div>

            <div className=" mt-24">
                <div className="w-30 mb-5 flex flex-row justify-end">
                    <Link href={"/dashboard/addSurvey"} >
                        <Button type="button" size="default" variant="default" className="bg-[#00B907] hover:bg-[#43a046]">Create Survey</Button>
                    </Link>
                </div>
                <DashboardCard
                    title={"asdsadasda"}
                    id={undefined}
                />
                <DashboardCard
                    title={"asdsadasda"}
                    id={undefined}
                />
                <DashboardCard
                    title={"asdsadasda"}
                    id={undefined}
                />
                <DashboardCard
                    title={"asdsadasda"}
                    id={undefined}
                />
                <DashboardCard
                    title={"asdsadasda"}
                    id={undefined}
                />
                <DashboardCard
                    title={"asdsadasda"}
                    id={undefined}
                />
                <DashboardCard
                    title={"asdsadasda"}
                    id={undefined}
                />
                <DashboardCard
                    title={"asdsadasda"}
                    id={undefined}
                />
                <DashboardCard
                    title={"asdsadasda"}
                    id={undefined}
                />
            </div>
        </div>
    );
}
    
