import { combineReducers } from "redux";
import page from "./page";
import toast from "./toast";

export default combineReducers({
  page,
  toast,
});
