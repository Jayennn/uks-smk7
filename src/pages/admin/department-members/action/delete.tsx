import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import React from "react";
import {DialogProps} from "@radix-ui/react-dialog";

interface DialogDeleteProps extends DialogProps {
  onClick: () => void
}

const ModalDeleteMember = ({onClick, ...props}: DialogDeleteProps) => {
  return (
    <>
      <AlertDialog {...props}>
        <AlertDialogContent className="font-inter sm:max-w-[580px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ModalDeleteMember;
