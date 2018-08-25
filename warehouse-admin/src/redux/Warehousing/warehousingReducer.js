import {types} from "./warehousingAction";
import * as _ from 'lodash';
import WarehousingModel from "../../model/WarehousingModel";
import {DEFAULT_CURRENT, DEFAULT_PAGE_SIZE, IN} from "../../utils/constants";

const initWarehousingState = {
    tableList: [{...WarehousingModel}, {...WarehousingModel, key: '1'}],
    pagination: {
        current: DEFAULT_CURRENT,
        pageSize: DEFAULT_PAGE_SIZE,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true
    },
    modal: {
        visible: false,
        title: '',
        confirmLoading: false,
    },
    editKey: '', //正在编辑的行的key
}
const WarehousingReducer = (state = initWarehousingState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case types.WAREHOUSING_PAGE:
            newState.tableList = action.data.records.map((record, index) => {
                record.key = index.toString();
                return record;
            });
            newState.tableList = action.data.records;
            newState.pagination.total = action.data.total;
            newState.pagination.current = action.data.current;
            newState.pagination.pageSize = action.data.size;
            break;
        case types.WAREHOUSING_ADD:
            newState.tableList.push({...WarehousingModel, key: state.tableList.length.toString()});
            break;
        case types.WAREHOUSING_EDIT:
            let index = newState.tableList.findIndex(record => record.key === action.data.key);
            newState.tableList.splice(index, 1, action.data);
            break;
        case types.WAREHOUSING_SAVE_BATCH:
            for (let i = 0; i < newState.tableList.length; i++) {
                newState.tableList[i].id = action.data[i].id;
            }
            break;
        case types.WAREHOUSING_SELECT_PRODUCT: {
            let product = action.data;
            let index = newState.tableList.findIndex(record => record.key === product.key);
            let record = newState.tableList[index];
            console.log('WAREHOUSING_SELECT_PRODUCT', record);
            record.productCode = product.code;
            record.supplierName = product.supplierName;
            record.specification = product.specification;
            record.warehouseName = product.warehouseName;
            record.productId = product.id;
            record.warehouseId = product.preferredWarehouseId;
            if(record.action == IN) {
                record.merchantId = product.supplierId;
            }
            record.unitName = product.unitName;
            record.quantity = 1;
            record.maxQuantity = product.prodWh.inventory;
            newState.tableList.splice(index, 1, record);
            break;
        }
        case types.WAREHOUSING_DEL:
            let tableList = newState.tableList.filter(record => record.key !== action.data);
            newState.tableList = tableList;
            break;
        case types.WAREHOUSING_MODAL_UPDATE:
            _.merge(newState, {modal: action.data});
            break;
        case types.WAREHOUSING_EDIT_KEY_UPDATE:
            newState.editKey = action.data;
            break;
        case types.WAREHOUSING_RESET:
            newState = initWarehousingState;
            newState.tableList.forEach(record => {
                record.action = action.data.action;
            });
            console.log(newState.tableList);
            break;
    }
    return newState;
};

export default WarehousingReducer;