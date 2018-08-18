// reducers 的汇总
import {combineReducers} from "redux";
import LoginReducer from "./loginReducer";
import UnitReducer from "./unitReducer";
import BrandReducer from "./brandReducer";

const appAllReducers = combineReducers({
    LoginReducer,
    UnitReducer,
    BrandReducer
});

export default appAllReducers;