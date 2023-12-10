"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, isValid} from "date-fns"
import { CalendarIcon } from "lucide-react"
import {DayPickerSingleProps} from "react-day-picker";

type DatePickerProps = DayPickerSingleProps & {
  date: Date | undefined,
  className?: string
}

export function DatePicker({onSelect, date, mode, className}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[320px] justify-start text-left font-normal border-0 rounded-none shadow-none border-b", !date && "text-muted-foreground", className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {isValid(date) && date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-popover md:w-[320px]  p-0">
        <Calendar
          mode={mode}
          captionLayout="dropdown-buttons"
          selected={date}
          onSelect={onSelect}
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  )
}
