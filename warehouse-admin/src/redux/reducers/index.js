// reducers 的汇总
import {combineReducers} from "redux";
import LoginReducer from "./loginReducer";
import UnitReducer from "./unitReducer";

const appAllReducers = combineReducers({
    LoginReducer,
    UnitReducer
});

export default appAllReducers;