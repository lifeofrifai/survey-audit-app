"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    onSelectDate: (date: string) => void
    baseDate?: string // New prop for base date
}

const DatePicker = ({
    onSelectDate,
    baseDate, // Accept the base date prop
}: DatePickerProps) => {
    const [date, setDate] = React.useState<string | null>(null)

    // Effect to update the state when baseDate changes
    React.useEffect(() => {
        if (baseDate) {
            setDate(baseDate)
        }
    }, [baseDate])

    const handleSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            const formattedDate = format(selectedDate, "yyyy-MM-dd")
            setDate(formattedDate)
            onSelectDate(formattedDate)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(new Date(date), "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[999999]">
                <Calendar
                    mode="single"
                    selected={date ? new Date(date) : undefined}
                    onSelect={handleSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker
