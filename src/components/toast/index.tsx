import { useSelector } from "react-redux";
import { AtToast } from "taro-ui";

export default function Toast() {
  const toast = useSelector(
    (state: {
      toast: { isOpen: boolean; status?: "error" | "success"; text: string };
    }) => state.toast
  );
  
  return (
    <AtToast
      isOpened={toast.isOpen}
      status={toast.status}
      text={toast.text}
    ></AtToast>
  );
}
