import axiosUtil from "../../utils/axiosUtil";
import {message} from "antd";

export const types = {
    BRAND_PAGE: 'BRAND_PAGE',
    BRAND_ADD: 'BRAND_ADD',
    BRAND_EDIT: 'BRAND_EDIT',
    BRAND_DEL: 'BRAND_DEL',
    BRAND_MODAL_UPDATE: 'BRAND_MODAL_UPDATE'
}

const brandAddAction = data => ({
    type: types.BRAND_ADD,
    data
});

const brandEditAction = data => ({
    type: types.BRAND_EDIT,
    data
});

export const getBrands = (pager) => (dispatch) => {
    return axiosUtil.get('/api/brand/page', {
        params: {
            ...pager
        }
    }).then(data => {
        dispatch({
            type: types.BRAND_PAGE,
            data: data
        });
        return Promise.resolve();
    })
};

export const saveBrand = ({id, ...rest}) => (dispatch) => {
    return axiosUtil.post(`/api/brand/save/${id}`, {id, ...rest})
        .then(data => {
            if (id > 0) {
                dispatch(brandEditAction(data));
            } else {
                dispatch(brandAddAction(data));
            }
            message.success('保存成功');
            return Promise.resolve();
        });
};

export const delBrand = (id) => (dispatch) => {
    return axiosUtil.delete(`/api/brand/delete/${id}`)
        .then(() => {
            dispatch(
                {
                    type: types.BRAND_DEL,
                    data: id
                }
            );
            message.success('删除成功');
            return Promise.resolve();
        });
};

export const updateBrandModal = data => dispatch => (dispatch({
    type: types.BRAND_MODAL_UPDATE,
    data
}));

