import axiosUtil from "../../utils/axiosUtil";
import {message} from "antd";

export const types = {
    PRODUCT_PAGE: 'PRODUCT_PAGE',
    PRODUCT_ADD: 'PRODUCT_ADD',
    PRODUCT_EDIT: 'PRODUCT_EDIT',
    PRODUCT_DEL: 'PRODUCT_DEL',
    PRODUCT_MODAL_UPDATE: 'PRODUCT_MODAL_UPDATE',
    PRODUCT_RACKS_UPDATE: 'PRODUCT_RACKS_UPDATE',
    PRODUCT_SELECT_MODAL_UPDATE: 'PRODUCT_SELECT_MODAL_UPDATE',
}

const productAddAction = data => ({
    type: types.PRODUCT_ADD,
    data
});

const productEditAction = data => ({
    type: types.PRODUCT_EDIT,
    data
});

export const getProducts = (pager) => (dispatch) => {
    return axiosUtil.get('/api/product/page', {
        params: {
            ...pager
        }
    }).then(result => {
        dispatch({
            type: types.PRODUCT_PAGE,
            data: result.data
        });
        return Promise.resolve();
    })
};

export const saveProduct = ({id, ...rest}) => (dispatch) => {
    return axiosUtil.post(`/api/product/save/${id}`, {id, ...rest})
        .then(result => {
            if (id > 0) {
                dispatch(productEditAction(result.data));
            } else {
                dispatch(productAddAction(result.data));
            }
            message.success('保存成功');
            return Promise.resolve();
        });
};

export const delProduct = (id) => (dispatch) => {
    return axiosUtil.delete(`/api/product/delete/${id}`)
        .then(() => {
            dispatch(
                {
                    type: types.PRODUCT_DEL,
                    data: id
                }
            );
            message.success('删除成功');
            return Promise.resolve();
        });
};

export const updateProductModal = data => dispatch => (dispatch({
    type: types.PRODUCT_MODAL_UPDATE,
    data
}));

export const updateProductSelectModal = data => dispatch => (dispatch({
    type: types.PRODUCT_SELECT_MODAL_UPDATE,
    data
}));

export const updateRacks = data => dispatch => (dispatch({
    type: types.PRODUCT_RACKS_UPDATE,
    data
}));


