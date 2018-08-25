import axiosUtil from "../../utils/axiosUtil";
import {message} from "antd";

export const types = {
    MERCHANT_PAGE: 'MERCHANT_PAGE',
    MERCHANT_ADD: 'MERCHANT_ADD',
    MERCHANT_EDIT: 'MERCHANT_EDIT',
    MERCHANT_DEL: 'MERCHANT_DEL',
    MERCHANT_MODAL_UPDATE: 'MERCHANT_MODAL_UPDATE'
}

const merchantAddAction = data => ({
    type: types.MERCHANT_ADD,
    data
});

const merchantEditAction = data => ({
    type: types.MERCHANT_EDIT,
    data
});

export const getMerchants = (pager) => (dispatch) => {
    return axiosUtil.get('/api/merchant/page', {
        params: {
            ...pager
        }
    }).then(data => {
        dispatch({
            type: types.MERCHANT_PAGE,
            data: data
        });
        return Promise.resolve();
    })
};

export const saveMerchant = ({id, ...rest}) => (dispatch) => {
    return axiosUtil.post(`/api/merchant/save/${id}`, {id, ...rest})
        .then(data => {
            if (id > 0) {
                dispatch(merchantEditAction(data));
            } else {
                dispatch(merchantAddAction(data));
            }
            message.success('保存成功');
            return Promise.resolve();
        });
};

export const delMerchant = (id) => (dispatch) => {
    return axiosUtil.delete(`/api/merchant/delete/${id}`)
        .then(() => {
            dispatch(
                {
                    type: types.MERCHANT_DEL,
                    data: id
                }
            );
            message.success('删除成功');
            return Promise.resolve();
        });
};

export const updateMerchantModal = data => dispatch => (dispatch({
    type: types.MERCHANT_MODAL_UPDATE,
    data
}));

