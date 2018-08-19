// reducers 的汇总
import {combineReducers} from "redux";
import LoginReducer from "./loginReducer";
import UnitReducer from "./unitReducer";
import BrandReducer from "./brandReducer";
import CategoryReducer from "./categoryReducer";

const appAllReducers = combineReducers({
    LoginReducer,
    UnitReducer,
    BrandReducer,
    CategoryReducer
});

export default appAllReducers;