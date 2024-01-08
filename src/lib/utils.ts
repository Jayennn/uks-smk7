import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function datedDay(day: string | undefined){
  if(moment(day).format("dddd, h:mm:ss") === "Invalid date"){
    return "No Set"
  }

  return moment(day).format("dddd, h:mm:ss")
}

export function formatedDateAndTime(day: string | undefined){
  return moment(day).format("YYYY-MM-DD HH:mm:ss")
}

export function dated(day: string | undefined) {
  if(moment(day).format("ddd, MMMM YYYY, h:mm:ss") === "Invalid date") {
    return "No Set"
  }
  return moment(day).format("ddd, MMMM YYYY, h:mm:ss")
}

export function initialName(name: string) {
  const name_split = name.split(" ")
  const res = name_split.map((text) => text.charAt(0))
  return (
    (res.shift()?.[0] || "")+ (res.pop() || "")
  ).toUpperCase()
}
