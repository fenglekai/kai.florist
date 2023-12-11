import { ReactChild, ReactFragment, ReactPortal } from "react";

declare type useReactChild =
  | boolean
  | ReactChild
  | ReactFragment
  | ReactPortal
  | null
  | undefined;

declare global {
  interface Window {
    _axiosPromiseArr: any[];
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
