import {motion} from "framer-motion";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {trpc} from "@/utils/trpc";
import {toast} from "sonner";
import {StatusUpdate} from "@/server/api/routers/departement-members/schema";

type SwitchProps = {
  htmlFor: string
  data: StatusUpdate
}

const Switch = ({htmlFor, data}: SwitchProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isOn, setIsOn] = useState(false)


  const updateStatus = trpc.member.statusUpdate.useMutation({
    onSuccess: async({message}) => {
      toast.success(message)
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })

  // Handle Request Throttle API
  const handleStatusUpdate = async() => {
    if (isLoading) {
      return; // Do nothing if already loading
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsOn(!isOn);

      // Toggle state and make API call
      await updateStatus.mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>

      <button onClick={handleStatusUpdate} disabled={true}  className={cn("p-[1px] disabled:cursor-not-allowed inline-flex items-center w-[40px] h-[20px] border border-zinc-700 bg-[#F9FAFB] rounded-full",
        isOn ? "justify-end" : "justify-start")}>

          <motion.div layout className={cn("shadow-md w-4 h-4 bg-red-500 rounded-full", isOn ? "bg-green-500" : "bg-red-500")}></motion.div>
      </button>
    </>
  )
}

export default Switch;
