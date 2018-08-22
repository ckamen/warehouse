import {types} from "../actions/productAction";
import * as _ from 'lodash';
import {ProductModel} from "../../model/ProductModel";

const initProductState = {
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
        title: '创建商品',
        confirmLoading: false,
        ...ProductModel
    },
    racks: []
}
const ProductReducer = (state = initProductState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case types.PRODUCT_PAGE:
            newState.tableList = action.data.records;
            newState.pagination.total = action.data.total;
            newState.pagination.current = action.data.current;
            newState.pagination.pageSize = action.data.size;
            break;
        case types.PRODUCT_ADD:
            newState.tableList.splice(0, 0, action.data);
            break;
        case types.PRODUCT_EDIT:
            let index = newState.tableList.findIndex(record => record.id === action.data.id);
            newState.tableList.splice(index, 1, action.data);
            break;
        case types.PRODUCT_DEL:
            let tableList = newState.tableList.filter(record => record.key !== action.data);
            newState.tableList = tableList;
            break;
        case types.PRODUCT_MODAL_UPDATE:
            _.merge(newState, {modal: action.data});
            break;
        case types.PRODUCT_RACKS_UPDATE:
            let rackNum = action.data;
            let racks = [];
            let value = 'A'.charCodeAt(0);
            for (let i = 0; i < rackNum; i++) {
                racks.push(String.fromCharCode(value + i));
            }
            newState.racks = racks;
            break;
    }
    return newState;
};

export default ProductReducer;