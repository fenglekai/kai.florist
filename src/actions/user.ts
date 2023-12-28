import { SET_USER, RESET_USER } from "@/constants/user";
import { User } from "@/reducers/user";
import { setStorageSync } from "@tarojs/taro";

export const setUser = (info: User) => {
  setStorageSync("user", info);
  return {
    type: SET_USER,
    ...info,
  };
};
export const resetUser = () => {
  setStorageSync("user", {
    username: "未登录",
    authorization: "",
  });
  return {
    type: RESET_USER,
  };
};
