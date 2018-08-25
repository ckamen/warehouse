import {types} from "./unitAction";
import * as _ from 'lodash';

const initUnitState = {
    tableList: [],
    modal: {
        visible: false,
        title: '创建计量单位',
        confirmLoading: false,
        id: -1,
        name: ''
    }
}
const UnitReducer = (state = initUnitState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case types.UNIT_PAGE:
            newState.tableList = action.data.records;
            break;
        case types.UNIT_ADD:
            newState.tableList.splice(0, 0, action.data);
            break;
        case types.UNIT_EDIT:
            let index = newState.tableList.findIndex(record => record.id === action.data.id);
            newState.tableList.splice(index, 1, action.data);
            break;
        case types.UNIT_DEL:
            let tableList = newState.tableList.filter(record => record.key !== action.data);
            newState.tableList = tableList;
            break;
        case types.UNIT_MODAL_UPDATE:
            _.merge(newState, {modal: action.data});
            break;
    }
    return newState;
};

export default UnitReducer;