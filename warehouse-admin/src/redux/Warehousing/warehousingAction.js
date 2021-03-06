import axiosUtil from "../../utils/axiosUtil";
import {message} from "antd";

export const types = {
    WAREHOUSING_PAGE: 'WAREHOUSING_PAGE',
    WAREHOUSING_ADD: 'WAREHOUSING_ADD',
    WAREHOUSING_EDIT: 'WAREHOUSING_EDIT',
    WAREHOUSING_DEL: 'WAREHOUSING_DEL',
    WAREHOUSING_SELECT_PRODUCT: 'WAREHOUSING_SELECT_PRODUCT',
    WAREHOUSING_MODAL_UPDATE: 'WAREHOUSING_MODAL_UPDATE',
    WAREHOUSING_EDIT_KEY_UPDATE: 'WAREHOUSING_EDIT_KEY_UPDATE',
    WAREHOUSING_SAVE_BATCH: 'WAREHOUSING_SAVE_BATCH',
    WAREHOUSING_RESET: 'WAREHOUSING_RESET',
}

export const editWarehousing = data => dispatch => dispatch({
    type: types.WAREHOUSING_EDIT,
    data
});

export const selectProductWarehousing = data => ({
    type: types.WAREHOUSING_SELECT_PRODUCT,
    data
});

export const getWarehousings = (pager) => (dispatch) => {
    return axiosUtil.get('/api/warehousing/page', {
        params: {
            ...pager
        }
    }).then(result => {
        dispatch({
            type: types.WAREHOUSING_PAGE,
            data: result.data
        });
        return Promise.resolve();
    })
};

export const saveBatchWarehousing = (records) => (dispatch) => {
    return axiosUtil.post(`/api/warehousing/save-batch`, {'jsonStr': JSON.stringify(records)})
        .then(result => {
            dispatch({
                type: types.WAREHOUSING_RESET,
                data: result.data
            });

            message.success('保存成功');
            return Promise.resolve();
        });
};

export const updateWarehousingModal = data => dispatch => (dispatch({
    type: types.WAREHOUSING_MODAL_UPDATE,
    data
}));

export const addWarehousing = data => dispatch => (
    dispatch({
        type: types.WAREHOUSING_ADD
    })
)

export const delWarehousing = data => dispatch => (
    dispatch({
        type: types.WAREHOUSING_DEL,
        data
    })
)

export const updateWarehousingEditKey = data => dispatch => (
    dispatch({
        type: types.WAREHOUSING_EDIT_KEY_UPDATE,
        data
    })
)

export const resetWarehousing = data => dispatch => (
    dispatch({
        type: types.WAREHOUSING_RESET,
        data
    })
)



