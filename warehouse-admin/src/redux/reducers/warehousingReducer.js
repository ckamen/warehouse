import {types} from "../actions/warehousingAction";
import * as _ from 'lodash';
import WarehousingModel from "../../model/WarehousingModel";

const initWarehousingState = {
    tableList: [{...WarehousingModel}],
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
    }
}
const WarehousingReducer = (state = initWarehousingState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case types.WAREHOUSING_PAGE:
            newState.tableList = action.data.records.map((record, index) => {
                record.key = index.toString()
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
        case types.WAREHOUSING_DEL:
            let tableList = newState.tableList.filter(record => record.key !== action.data);
            newState.tableList = tableList;
            break;
        case types.WAREHOUSING_MODAL_UPDATE:
            _.merge(newState, {modal: action.data});
            break;
    }
    return newState;
};

export default WarehousingReducer;