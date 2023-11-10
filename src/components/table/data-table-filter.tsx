import {Table} from "@tanstack/react-table";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

interface DataTableFilterProps<TData>{
  table: Table<TData>
  placeholder: string
  searchByColumn: string
  className?: string
}

const DataTableFilter = <TData, _>({table, placeholder, searchByColumn, className}: DataTableFilterProps<TData>) => {
  return (
    <>
      <div className={cn("flex items-center py-4", className)}>
        <Input
          type="text"
          placeholder={placeholder}
          value={(table.getColumn(searchByColumn)?.getFilterValue() as string) ?? ""}
          onChange={(e) => {
            table.getColumn(searchByColumn)?.setFilterValue(e.target.value)
          }}
        />
      </div>
    </>
  )
}

export default DataTableFilter;
