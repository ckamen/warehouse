import {types} from "./importAction";
import * as _ from 'lodash';

const initImportState = {
    modal: {
        visible: false,
        title: '导入商品',
        confirmLoading: false,
    },
}
const ImportReducer = (state = initImportState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case types.IMPORT_MODAL_UPDATE:
            _.merge(newState, {modal: action.data});
            break;
    }
    return newState;
};

export default ImportReducer;