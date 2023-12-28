import { SET_USER, RESET_USER } from "@/constants/user";
import { getStorageSync } from "@tarojs/taro";

export interface User {
  username: string;
  authorization: string;
}

const INITIAL_STATE = {
  username: "未登录",
  authorization: "",
};

export default function user(
  state = INITIAL_STATE,
  action: { type: string } & User
) {
  const userStore = getStorageSync('user')
  state.username = userStore.username
  state.authorization = userStore.authorization
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        username: action.username,
        authorization: action.authorization,
      };

    case RESET_USER:
      return {
        ...state,
        username: "未登录",
        authorization: "",
      };

    default:
      return state;
  }
}
