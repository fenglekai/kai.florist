import { combineReducers } from "redux";
import page from "./page";
import toast from "./toast";
import user from "./user";

export default combineReducers({
  page,
  toast,
  user
});
