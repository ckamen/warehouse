import * as types from './actionTypes.js';
import axiosUtil from "../../utils/axiosUtil";
import {message} from "antd";

const BrandAddAction = data => ({
    type: types.BRAND_ADD,
    data
});

const BrandEditAction = data => ({
    type: types.BRAND_EDIT,
    data
});

const getBrands = (pager) => (dispatch) => {
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

const saveBrand = ({id, ...rest}) => (dispatch) => {
    return axiosUtil.post(`/api/brand/save/${id}`, {id, ...rest})
        .then(data => {
            if (id > 0) {
                dispatch(BrandEditAction(data));
            } else {
                dispatch(BrandAddAction(data));
            }
            message.success('保存成功');
            return Promise.resolve();
        });
};

const delBrand = (id) => (dispatch) => {
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

const updateBrandModal = data => dispatch => (dispatch({
    type: types.BRAND_MODAL_UPDATE,
    data
}));

export {getBrands, saveBrand, delBrand, updateBrandModal};