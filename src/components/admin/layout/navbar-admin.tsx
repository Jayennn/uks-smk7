import {Search} from "lucide-react";
import {cn} from "@/lib/utils";
import DropdownAvatar from "@/components/admin/dropdown-avatar";

const NavbarAdmin = () => {
  return (
    <>
      <nav className="bg-[#FFFFFF] border-b">
        <div className="container py-5 flex items-center justify-between">
          <div className={cn("flex w-[28rem] items-center placeholder:text-muted-foreground rounded-md bg-[#F9FAFB] px-3 py-1 space-x-3")}>
            <Search size={18}/>
            <input
              className={cn("h-7 w-full border-none bg-transparent text-sm shadow-none focus:outline-none")}
              placeholder="Search here..."
              type="text"
            />
          </div>
          <DropdownAvatar />
        </div>
      </nav>
    </>
  )
}

export default NavbarAdmin;
