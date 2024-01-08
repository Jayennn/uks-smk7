import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {trpc} from "@/utils/trpc";
import {toast} from "sonner";
import {StatusUpdate} from "@/server/api/routers/departement-members/schema";

type SwitchProps = {
  data: StatusUpdate
}

const Switch = ({ data }: SwitchProps) => {
  const [isActive, setIsActive] = useState(false)

  const updateStatus = trpc.member.statusUpdate.useMutation({
    onSuccess: async({message}) => {
      toast.success(message)
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })

  console.log(isActive)

//   // Handle Request Throttle API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await updateStatus.mutateAsync({
//           ...data,
//           status_aktif: isActive ? "2" : "1"
//         });
//       } catch (error) {
//         console.log(error)
//       }
//     }
//
//     fetchData()
// }, [isActive])

  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" onChange={(e) => setIsActive(e.target.checked)} className="sr-only peer"/>
        <div className="w-[40px] h-[20px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
      {/*<button  onClick={() => setIsActive((prev) => !prev)}  className={cn("p-[1px] disabled:cursor-not-allowed inline-flex items-center w-[40px] h-[20px] border border-zinc-700 bg-[#F9FAFB] rounded-full",*/}
      {/*  isActive ? "justify-end" : "justify-start")}>*/}
      {/*    <motion.div layout className={cn("shadow-md w-4 h-4 bg-red-500 rounded-full", isActive ? "bg-green-500" : "bg-red-500")}></motion.div>*/}
      {/*</button>*/}
    </>
  )
}

export default Switch;
