import {ColumnDef} from "@tanstack/react-table";
import {OptionReport} from "@/server/api/routers/form/option-form/schema";
import {dated} from "@/lib/utils";
import {Checkbox} from "@/components/ui/checkbox";

export const columns: ColumnDef<OptionReport>[] = [
  {
    id: "Select",
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    )
  },
  {
    header: "No",
    cell: ({row}) => row.index + 1
  },
  {
    accessorKey: "pertanyaan",
    header: "Pertanyaan",
    cell: ({row}) => <p className="max-w-[10rem] truncate">{row.original.pertanyaan}</p>
  },
  {
    accessorKey: "subbagian_rapor_kesehatan.label",
    header: "Sub Bagian"
  },
  {
    accessorKey: "required",
    header: "Required",
    cell: ({row}) => {
      if(row.original.required === "1"){
        return "Yes"
      }

      if(row.original.required === "0"){
        return "Optional"
      }
    }
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({row}) => dated(row.original.created_at)
  },
]
