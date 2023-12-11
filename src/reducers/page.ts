import { SHOW_NAVBAR, DISABLE_NAVBAR } from "@/constants/page";

const INITIAL_STATE = {
  navBar: true,
};

export default function page(state = INITIAL_STATE, action: { type: string; }) {
  switch (action.type) {
    case SHOW_NAVBAR:
      return {
        ...state,
        navBar: true,
      };

    case DISABLE_NAVBAR:
      return {
        ...state,
        navBar: false,
      };

    default:
      return state;
  }
}
