// reducers 的汇总
import {combineReducers} from "redux";
import LoginReducer from "./Login/loginReducer";
import UnitReducer from "./Unit/unitReducer";
import BrandReducer from "./Brand/brandReducer";
import CategoryReducer from "./Category/categoryReducer";
import MerchantReducer from "./Merchant/merchantReducer";
import ContactReducer from "./Contact/contactReducer";
import UserReducer from "./User/userReducer";
import WarehouseReducer from "./Warehouse/warehouseReducer";
import ProductReducer from "./Product/productReducer";
import WarehousingReducer from "./Warehousing/warehousingReducer";
import ImportReducer from "./Import/importReducer";
import MenuReducer from "./Menu/menuReducer";

const appAllReducers = combineReducers({
    LoginReducer,
    UnitReducer,
    BrandReducer,
    CategoryReducer,
    MerchantReducer,
    ContactReducer,
    UserReducer,
    WarehouseReducer,
    ProductReducer,
    WarehousingReducer,
    ImportReducer,
    MenuReducer
});

export default appAllReducers;