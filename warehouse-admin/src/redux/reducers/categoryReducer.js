import {types} from "../actions/categoryAction";
import * as _ from 'lodash';
import {MAX_SIZE} from "../../utils/constants";
import CategoryModel from "../../model/CategoryModel";

const initCategoryState = {
    tableList: [],
    pagination: {
        current: 1,
        pageSize: MAX_SIZE,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        hideOnSinglePage: true
    },
    modal: {
        visible: false,
        title: '创建类别',
        confirmLoading: false,
        ...CategoryModel
    },
    selectedType: '1',
    treeData: []
}
const CategoryReducer = (state = initCategoryState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case types.CATEGORY_PAGE:
            newState.tableList = action.data.records;
            newState.pagination.total = action.data.total;
            newState.pagination.current = action.data.current;
            newState.pagination.pageSize = action.data.size;
            newState.treeData = recordsToTreeData(newState.tableList);
            break;
        case types.CATEGORY_ADD:
            // newState.tableList.splice(0, 0, action.data);
            break;
        case types.CATEGORY_EDIT:
            let index = newState.tableList.findIndex(record => record.id === action.data.id);
            newState.tableList.splice(index, 1, action.data);
            break;
        case types.CATEGORY_DEL:
            let tableList = newState.tableList.filter(record => record.id !== action.data);
            newState.tableList = tableList;
            break;
        case types.CATEGORY_MODAL_UPDATE:
            _.merge(newState, {modal: action.data});
            break;
        case types.CATEGORY_TYPE_UPDATE:
            newState.selectedType = action.data;
            break;
    }
    return newState;
};

const recordsToTreeData = (records) => {
    let treeData = [];
    let treeMap = {};
    if (records != null && records.length > 0) {
        for (let record of records) {
            if (record.level > 0) {
                let parentNode = treeMap[record.parent.id];
                if (parentNode) {
                    let node = recordToNode(record);
                    treeMap[record.id] = node;
                    parentNode.children.push(node);
                }
            } else {
                let node = recordToNode(record);
                treeMap[record.id] = node;
                treeData.push(node);
            }
        }
    }
    return treeData;
}
const recordToNode = (record) => {
    return {
        title: record.name,
        value: record.id + '',
        key: record.key + '',
        level: record.level,
        children: []
    };
}

export default CategoryReducer;