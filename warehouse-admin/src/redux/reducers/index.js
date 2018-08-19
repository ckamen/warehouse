// reducers 的汇总
import {combineReducers} from "redux";
import LoginReducer from "./loginReducer";
import UnitReducer from "./unitReducer";
import BrandReducer from "./brandReducer";
import CategoryReducer from "./categoryReducer";
import MerchantReducer from "./merchantReducer";

const appAllReducers = combineReducers({
    LoginReducer,
    UnitReducer,
    BrandReducer,
    CategoryReducer,
    MerchantReducer
});

export default appAllReducers;