import {ColumnDef} from "@tanstack/react-table";
import {SubSectionReport} from "@/server/api/routers/form/sub-section-form/schema";
import {dated} from "@/lib/utils";

export const columns: ColumnDef<SubSectionReport>[] = [
  {
    header: "No",
    cell: ({row}) => row.index + 1
  },
  {
    accessorKey: "label",
    header: "Label"
  },
  {
    accessorKey: "bagian_id",
    header: "Bagian",
    cell: ({row}) => <p className="max-w-[7rem] truncate">{row.original.bagian_rapor_kesehatan.label}</p>
  },
  {
    accessorKey: "Created_at",
    header: "Created At",
    cell: ({row}) => dated(row.original.created_at)
  }
]
