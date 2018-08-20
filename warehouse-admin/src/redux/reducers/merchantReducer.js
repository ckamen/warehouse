import {types} from "../actions/merchantAction";
import * as _ from 'lodash';

const initMerchantState = {
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
        title: '创建',
        confirmLoading: false,

        id: -1,
        code: '',
        name: '',
        categoryId: undefined,
        remark: ''
    }
}
const MerchantReducer = (state = initMerchantState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case types.MERCHANT_PAGE:
            newState.tableList = action.data.records;
            newState.pagination.total = action.data.total;
            newState.pagination.current = action.data.current;
            newState.pagination.pageSize = action.data.size;
            break;
        case types.MERCHANT_ADD:
            newState.tableList.splice(0, 0, action.data);
            break;
        case types.MERCHANT_EDIT:
            let index = newState.tableList.findIndex(record => record.id === action.data.id);
            newState.tableList.splice(index, 1, action.data);
            break;
        case types.MERCHANT_DEL:
            let tableList = newState.tableList.filter(record => record.id !== action.data);
            newState.tableList = tableList;
            break;
        case types.MERCHANT_MODAL_UPDATE:
            _.merge(newState, {modal: action.data});
            break;
    }
    return newState;
};

export default MerchantReducer;