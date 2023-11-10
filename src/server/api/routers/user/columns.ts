import {ColumnDef}  from "@tanstack/react-table";
import {User} from "@/server/api/routers/user/schema";
import moment from "moment";


export const columns: ColumnDef<User>[] = [
  {
    header: "No",
    cell: ({row}) => row.index + 1

  },
  {
    accessorKey: "username",
    header: "Username"
  },
  {
    accessorKey: "last_login",
    header: "Last Login",
    cell: ({row}) => {
      const last_login = moment(row.original.last_login)
      const from_now = last_login.fromNow()

      if(from_now.includes("Invalid date")) return "No Login"

      if(!from_now.includes('day')) return last_login.format('ddd, MMMM YYYY')
      return from_now
    }
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({row}) => moment(row.original.updated_at).format("ddd, MMMM YYYY")
  }
]
