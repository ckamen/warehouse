import {types} from "./contactAction";
import * as _ from 'lodash';

const initContactState = {
    tableList: [],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true
    }
}

const ContactModel = {
    key: '0',
    name: '',
    phone: '',
    tel: '',
    snsContact: '',
    address: '',
    primaryInd: null,
}

const ContactReducer = (state = initContactState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case types.CONTACT_INIT:
            newState.tableList = [{...ContactModel}];
            break;
        case types.CONTACT_PAGE:
            newState.tableList = action.data.records.map((record, index) => {
                record.key = index.toString()
                return record;
            });
            newState.pagination.total = action.data.total;
            newState.pagination.current = action.data.current;
            newState.pagination.pageSize = action.data.size;
            break;
        case types.CONTACT_ADD:
            newState.tableList.push({...ContactModel, key: state.tableList.length.toString()});
            break;
        case types.CONTACT_SAVE:
            let index = newState.tableList.findIndex(record => record.id === action.data.id);
            const item = newState.tableList[index];
            newState.tableList.splice(index, 1, {
                ...item,
                ...action.data,
            });
            break;
        case types.CONTACT_DEL:
            let tableList = newState.tableList.filter(record => record.key !== action.data);
            newState.tableList = tableList;
            break;
    }
    return newState;
};

export default ContactReducer;