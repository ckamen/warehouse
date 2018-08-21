import {types} from "../actions/userAction";
import * as _ from 'lodash';
import UserModel from "../../model/UserModel";

const initUserState = {
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
        title: '创建用户',
        confirmLoading: false,
        ...UserModel
    }
}
const UserReducer = (state = initUserState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case types.USER_PAGE:
            newState.tableList = action.data.records;
            newState.pagination.total = action.data.total;
            newState.pagination.current = action.data.current;
            newState.pagination.pageSize = action.data.size;
            break;
        case types.USER_ADD:
            newState.tableList.splice(0, 0, action.data);
            break;
        case types.USER_EDIT:
            let index = newState.tableList.findIndex(record => record.id === action.data.id);
            newState.tableList.splice(index, 1, action.data);
            break;
        case types.USER_DEL:
            let tableList = newState.tableList.filter(record => record.id !== action.data);
            newState.tableList = tableList;
            break;
        case types.USER_MODAL_UPDATE:
            _.merge(newState, {modal: action.data});
            break;
    }
    return newState;
};

export default UserReducer;