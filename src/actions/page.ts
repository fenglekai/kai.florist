import { SHOW_NAVBAR, DISABLE_NAVBAR } from "@/constants/page";

export const showNavBar = () => {
  return {
    type: SHOW_NAVBAR,
  };
};
export const disableNavBar = () => {
  return {
    type: DISABLE_NAVBAR,
  };
};

export function asyncShowNavBar() {
  return (dispatch: (arg0: { type: string }) => void) => {
    setTimeout(() => {
      dispatch(showNavBar());
    }, 2000);
  };
}
