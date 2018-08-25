import axiosUtil from "../../utils/axiosUtil";
import {message} from "antd";

export const types = {
    WAREHOUSE_PAGE: 'WAREHOUSE_PAGE',
    WAREHOUSE_ADD: 'WAREHOUSE_ADD',
    WAREHOUSE_EDIT: 'WAREHOUSE_EDIT',
    WAREHOUSE_DEL: 'WAREHOUSE_DEL',
    WAREHOUSE_MODAL_UPDATE: 'WAREHOUSE_MODAL_UPDATE'
}

const warehouseAddAction = data => ({
    type: types.WAREHOUSE_ADD,
    data
});

const warehouseEditAction = data => ({
    type: types.WAREHOUSE_EDIT,
    data
});

export const getWarehouses = (pager) => (dispatch) => {
    return axiosUtil.get('/api/warehouse/page', {
        params: {
            ...pager
        }
    }).then(result => {
        dispatch({
            type: types.WAREHOUSE_PAGE,
            data: result.data
        });
        return Promise.resolve();
    })
};

export const saveWarehouse = ({id, ...rest}) => (dispatch) => {
    return axiosUtil.post(`/api/warehouse/save/${id}`, {id, ...rest})
        .then(result => {
            if (id > 0) {
                dispatch(warehouseEditAction(result.data));
            } else {
                dispatch(warehouseAddAction(result.data));
            }
            message.success('保存成功');
            return Promise.resolve();
        });
};

export const delWarehouse = (id) => (dispatch) => {
    return axiosUtil.delete(`/api/warehouse/delete/${id}`)
        .then(() => {
            dispatch(
                {
                    type: types.WAREHOUSE_DEL,
                    data: id
                }
            );
            message.success('删除成功');
            return Promise.resolve();
        });
};

export const updateWarehouseModal = data => dispatch => (dispatch({
    type: types.WAREHOUSE_MODAL_UPDATE,
    data
}));

