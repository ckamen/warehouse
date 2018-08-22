import axiosUtil from "../../utils/axiosUtil";
import {message} from "antd";

export const types = {
    PRODUCT_PAGE: 'PRODUCT_PAGE',
    PRODUCT_ADD: 'PRODUCT_ADD',
    PRODUCT_EDIT: 'PRODUCT_EDIT',
    PRODUCT_DEL: 'PRODUCT_DEL',
    PRODUCT_MODAL_UPDATE: 'PRODUCT_MODAL_UPDATE',
    PRODUCT_RACKS_UPDATE: 'PRODUCT_RACKS_UPDATE',
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
    }).then(data => {
        dispatch({
            type: types.PRODUCT_PAGE,
            data: data
        });
        return Promise.resolve();
    })
};

export const saveProduct = ({id, ...rest}) => (dispatch) => {
    return axiosUtil.post(`/api/product/save/${id}`, {id, ...rest})
        .then(data => {
            if (id > 0) {
                dispatch(productEditAction(data));
            } else {
                dispatch(productAddAction(data));
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

export const updateRacks = data => dispatch => (dispatch({
    type: types.PRODUCT_RACKS_UPDATE,
    data
}));

