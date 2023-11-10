import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function dated(day: string | undefined) {
  return moment(day).format("ddd, MMMM YYYY")
}
