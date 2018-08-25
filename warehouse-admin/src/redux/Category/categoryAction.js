import axiosUtil from "../../utils/axiosUtil";
import {message} from "antd";

export const types = {
    CATEGORY_PAGE: 'CATEGORY_PAGE',
    CATEGORY_ADD: 'CATEGORY_ADD',
    CATEGORY_EDIT: 'CATEGORY_EDIT',
    CATEGORY_DEL: 'CATEGORY_DEL',
    CATEGORY_MODAL_UPDATE: 'CATEGORY_MODAL_UPDATE',
    CATEGORY_TYPE_UPDATE: 'CATEGORY_TYPE_UPDATE',
};

const categoryAddAction = data => ({
    type: types.CATEGORY_ADD,
    data
});

const categoryEditAction = data => ({
    type: types.CATEGORY_EDIT,
    data
});

export const getCategories = (pager) => (dispatch) => {
    return axiosUtil.get('/api/category/page', {
        params: {
            ...pager
        }
    }).then(result => {
        dispatch({
            type: types.CATEGORY_PAGE,
            data: result.data
        });
        return Promise.resolve();
    })
};

export const saveCategory = (category) => (dispatch) => {
    let {id} = category;
    return axiosUtil.post(`/api/category/save/${id}`, category)
        .then(result => {
            if (id > 0) {
                dispatch(categoryEditAction(result.data));
            } else {
                dispatch(categoryAddAction(result.data));
            }
            message.success('保存成功');
            return Promise.resolve();
        });
};

export const delCategory = (id) => (dispatch) => {
    return axiosUtil.delete(`/api/category/delete/${id}`)
        .then(() => {
            dispatch(
                {
                    type: types.CATEGORY_DEL,
                    data: id
                }
            );
            message.success('删除成功');
            return Promise.resolve();
        });
};

export const updateCategoryModal = data => dispatch => dispatch({
    type: types.CATEGORY_MODAL_UPDATE,
    data
});

export const updateCategoryType = data => dispatch => dispatch({
    type: types.CATEGORY_TYPE_UPDATE,
    data
});


