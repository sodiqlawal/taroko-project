import { TOAST_OPTION } from "@/constant";
import { ToastContext } from "@/context/ToastContext";
import { useContext } from "react";

export const useToast = () => {
  const { setToast } = useContext(ToastContext);

  const toast = ({
    type,
    message,
  }: {
    type: TOAST_OPTION;
    message: string;
  }) => {
    setToast({ isOpen: true, type, message });

    setTimeout(() => {
      setToast({ isOpen: false, type, message: "" });
    }, 5000);
  };

  return {
    toast,
  };
};
