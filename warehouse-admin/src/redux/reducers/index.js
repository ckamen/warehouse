// reducers 的汇总
import {combineReducers} from "redux";
import LoginReducer from "./loginReducer";
import UnitReducer from "./unitReducer";
import BrandReducer from "./brandReducer";
import CategoryReducer from "./categoryReducer";
import MerchantReducer from "./merchantReducer";
import ContactReducer from "./contactReducer";
import UserReducer from "./userReducer";
import WarehouseReducer from "./warehouseReducer";
import ProductReducer from "./productReducer";

const appAllReducers = combineReducers({
    LoginReducer,
    UnitReducer,
    BrandReducer,
    CategoryReducer,
    MerchantReducer,
    ContactReducer,
    UserReducer,
    WarehouseReducer,
    ProductReducer
});

export default appAllReducers;