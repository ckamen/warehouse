import {types} from "../actions/brandAction";
import * as _ from 'lodash';

const initBrandState = {
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
        title: '创建品牌',
        confirmLoading: false,
        id: -1,
        code: '',
        name: '',
        active: 1
    }
}
const BrandReducer = (state = initBrandState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case types.BRAND_PAGE:
            newState.tableList = action.data.records;
            newState.pagination.total = action.data.total;
            newState.pagination.current = action.data.current;
            newState.pagination.pageSize = action.data.size;
            break;
        case types.BRAND_ADD:
            newState.tableList.splice(0, 0, action.data);
            break;
        case types.BRAND_EDIT:
            let index = newState.tableList.findIndex(record => record.id === action.data.id);
            newState.tableList.splice(index, 1, action.data);
            break;
        case types.BRAND_DEL:
            let tableList = newState.tableList.filter(record => record.id !== action.data);
            newState.tableList = tableList;
            break;
        case types.BRAND_MODAL_UPDATE:
            _.merge(newState, {modal: action.data});
            break;
    }
    return newState;
};

export default BrandReducer;