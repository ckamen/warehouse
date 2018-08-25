import axiosUtil from "../../utils/axiosUtil";
import {message} from "antd";

export const types = {
    USER_PAGE: 'USER_PAGE',
    USER_ADD: 'USER_ADD',
    USER_EDIT: 'USER_EDIT',
    USER_DEL: 'USER_DEL',
    USER_MODAL_UPDATE: 'USER_MODAL_UPDATE'
}

const userAddAction = data => ({
    type: types.USER_ADD,
    data
});

const userEditAction = data => ({
    type: types.USER_EDIT,
    data
});

export const getUsers = (pager) => (dispatch) => {
    return axiosUtil.get('/api/user/page', {
        params: {
            ...pager
        }
    }).then(data => {
        dispatch({
            type: types.USER_PAGE,
            data: data
        });
        return Promise.resolve();
    })
};

export const saveUser = ({id, ...rest}) => (dispatch) => {
    return axiosUtil.post(`/api/user/save/${id}`, {id, ...rest})
        .then(data => {
            if (id > 0) {
                dispatch(userEditAction(data));
            } else {
                dispatch(userAddAction(data));
            }
            message.success('保存成功');
            return Promise.resolve();
        });
};

export const delUser = (id) => (dispatch) => {
    return axiosUtil.delete(`/api/user/delete/${id}`)
        .then(() => {
            dispatch(
                {
                    type: types.USER_DEL,
                    data: id
                }
            );
            message.success('删除成功');
            return Promise.resolve();
        });
};

export const updateUserModal = data => dispatch => (dispatch({
    type: types.USER_MODAL_UPDATE,
    data
}));

