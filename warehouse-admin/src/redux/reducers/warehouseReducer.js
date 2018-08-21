import {types} from "../actions/warehouseAction";
import * as _ from 'lodash';
import WarehouseModel from "../../model/WarehouseModel";

const initWarehouseState = {
    tableList: [],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true
    },
    modal: {
        visible: false,
        title: '创建仓库',
        confirmLoading: false,
        ...WarehouseModel
    }
}
const WarehouseReducer = (state = initWarehouseState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case types.WAREHOUSE_PAGE:
            newState.tableList = action.data.records;
            newState.pagination.total = action.data.total;
            newState.pagination.current = action.data.current;
            newState.pagination.pageSize = action.data.size;
            break;
        case types.WAREHOUSE_ADD:
            newState.tableList.splice(0, 0, action.data);
            break;
        case types.WAREHOUSE_EDIT:
            let index = newState.tableList.findIndex(record => record.id === action.data.id);
            newState.tableList.splice(index, 1, action.data);
            break;
        case types.WAREHOUSE_DEL:
            let tableList = newState.tableList.filter(record => record.id !== action.data);
            newState.tableList = tableList;
            break;
        case types.WAREHOUSE_MODAL_UPDATE:
            _.merge(newState, {modal: action.data});
            break;
    }
    return newState;
};

export default WarehouseReducer;