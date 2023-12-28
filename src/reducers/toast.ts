import { SHOW_TOAST, DISABLE_TOAST } from "@/constants/toast";

export interface ToastInfo {
  status?: "error" | "success";
  text: string;
}

const INITIAL_STATE = {
  isOpen: false,
  status: "error",
  text: "",
};

export default function toast(
  state = INITIAL_STATE,
  action: { type: string } & ToastInfo
) {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        isOpen: true,
        status: action.status,
        text: action.text,
      };

    case DISABLE_TOAST:
      return {
        ...state,
        isOpen: false,
        status: "error",
        text: "",
      };

    default:
      return state;
  }
}
