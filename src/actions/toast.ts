import { SHOW_TOAST, DISABLE_TOAST } from "@/constants/toast";
import { ToastInfo } from "@/reducers/toast";

export const showToast = (info: ToastInfo) => {
  return {
    type: SHOW_TOAST,
    ...info,
  };
};
export const disableToast = () => {
  return {
    type: DISABLE_TOAST,
  };
};
