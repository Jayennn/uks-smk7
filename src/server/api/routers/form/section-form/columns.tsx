import {CellContext, ColumnDef} from "@tanstack/react-table";
import {SectionReport} from "@/server/api/routers/form/section-form/schema";
import {dated} from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";
import {useState} from "react";
import {trpc} from "@/utils/trpc";
import {useToast} from "@/components/ui/use-toast";
import ModalDeleteSection from "@/pages/admin/manage-forms/section-forms/action/delete";
import ModalUpdateSection from "@/pages/admin/manage-forms/section-forms/action/update";

const Action = ({row}: CellContext<SectionReport, unknown>) => {
  const { toast } = useToast();
  const {id} = row.original;
  const ctx = trpc.useUtils();
  const [openDialog, setOpenDialog] = useState({
    delete: false,
    update: false,
    detail: false
  })
  const [idSection, setIdSection] = useState<number | undefined>(undefined)

  const deleteSection = trpc.form.section.delete.useMutation({
    onSuccess: async({message}) => {
      toast({
        title: "Success",
        description: message
      })
      await ctx.form.section.all.invalidate()
    },
    onError: ({data, message}) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: data?.errZod ?? message
      })
    }
  })

  return (
    <>
      <ModalDeleteSection
        open={openDialog.delete}
        onOpenChange={() => {
          setOpenDialog((prev) => ({
            ...prev,
            delete: false
          }))
          setIdSection(undefined)
        }}
        onClick={async() => {
          await deleteSection.mutateAsync({id})
        }}
      />
      <ModalUpdateSection
        id={id}
        open={openDialog.update}
        onOpenChange={() => {
          setOpenDialog((prev) => ({
            ...prev,
            update: false
          }))
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal size={18}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-inter" align="end">
          <DropdownMenuLabel>Table Action</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {
              setOpenDialog((prev) => ({
                ...prev,
                update: true
              }))
            }}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              setOpenDialog((prev) => ({
                ...prev,
                delete: true
              }))
            }}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export const columns: ColumnDef<SectionReport>[] = [
  {
    header: "No",
    cell: ({row}) => row.index + 1
  },
  {
    accessorKey: "label",
    header: "Label"
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({row}) => dated(row.original.created_at)
  },
  {
    id: "Action",
    cell: Action
  }
]
