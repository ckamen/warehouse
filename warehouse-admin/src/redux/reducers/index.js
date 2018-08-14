// reducers 的汇总
import {combineReducers} from "redux";
import LoginReducer from "./loginReducer";

const appAllReducers = combineReducers({
    LoginReducer
});

export default appAllReducers;