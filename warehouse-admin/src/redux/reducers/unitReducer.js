import {UNIT_ADD, UNIT_DEL, UNIT_EDIT} from "../actions/actionTypes";

const initUnitState = {
    tableData: [{
        key: '1',
        name: '个'
    }, {
        key: '2',
        name: '件'
    }],
}
const UnitReducer = (state = initUnitState, action) => {
    switch (action.type) {
        case UNIT_ADD:
            return Object.assign(
                {},
                ...state,
                action.data,
            );
        case UNIT_EDIT:
            return Object.assign(
                {},
                ...state,
                action.data,
            );
        case UNIT_DEL:
            return Object.assign(
                {},
                ...state,
                action.data,
            );
        default:
            return state;
    }
};

export default UnitReducer;