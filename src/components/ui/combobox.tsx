import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {PopoverProps} from "@radix-ui/react-popover";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";


type Data<T> = {
  value: T,
  label: T
}

type ComboboxProps<T> = PopoverProps & {
  label: string,
  placeholder: string,
  data: Data<T>[],
  value: string,
  setValue: (value: string) => void,
  className?: string
}

export const Combobox = <T extends string | number>({label, placeholder, data, value, setValue, className,...props}: ComboboxProps<T>) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Popover modal={true} {...props} open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
             variant="outline"
             role="combobox"
             aria-expanded={open}
             className={cn("w-[200px] justify-between", className)}
          >
            {value ? data.find((item) => item.value === value.toUpperCase())?.label : label}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-popover z-[90] p-0">
          <Command>
            <CommandInput placeholder={placeholder}/>
            <ScrollArea className="h-[150px]">
              <CommandEmpty>Not Found</CommandEmpty>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem onSelect={(v) => {
                    setValue(v === value ? "" : v)
                    setOpen(false)
                  }} key={item.value} value={item.value.toString()}>
                    {item.label}
                    <CheckIcon className={cn(
                      "ml-auto h-4 w-4",
                      value?.toUpperCase() === item.value ? "opacity-100" : "opacity-0"
                    )}/>
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
