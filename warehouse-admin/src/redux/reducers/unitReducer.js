import {UNIT_ADD, UNIT_DEL, UNIT_EDIT, UNIT_MODAL_UPDATE, UNIT_PAGE} from "../actions/actionTypes";
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
        case UNIT_PAGE:
            newState.tableList = action.data;
            break;
        case UNIT_ADD:
            newState.tableList.splice(0, 0, action.data);
            break;
        case UNIT_EDIT:
            let index = newState.tableList.findIndex(record => record.id === action.data.id);
            newState.tableList.splice(index, 1, action.data);
        case UNIT_DEL:
            let tableList = newState.tableList.filter(record => record.id !== action.data);
            newState.tableList = tableList;
            break;
        case UNIT_MODAL_UPDATE:
            _.merge(newState, {modal: action.data});
            break;
    }
    return newState;
};

export default UnitReducer;