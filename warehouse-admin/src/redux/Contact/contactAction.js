import axiosUtil from "../../utils/axiosUtil";
import {MAX_SIZE} from "../../utils/constants";

export const types = {
    CONTACT_PAGE: 'CONTACT_PAGE',
    CONTACT_ADD: 'CONTACT_ADD',
    CONTACT_SAVE: 'CONTACT_SAVE',
    CONTACT_DEL: 'CONTACT_DEL',
    CONTACT_INIT: 'CONTACT_INIT',
}

export const addContact = data => (dispatch) => dispatch({
    type: types.CONTACT_ADD,
    data
});


export const getContacts = (pager) => (dispatch) => {
    return axiosUtil.get('/api/contact/page', {
        params: {
            ...pager,
            pageSize: MAX_SIZE
        }
    }).then(result => {
        dispatch({
            type: types.CONTACT_PAGE,
            data: result.data
        });
        return Promise.resolve();
    })
};

export const saveContact = (data) => (dispatch) => {
    dispatch({
        type: types.CONTACT_SAVE,
        data: data
    })
};

export const delContact = (data) => (dispatch) => {
    dispatch({
        type: types.CONTACT_DEL,
        data: data
    })
};

export const initContact = (data) => dispatch => (
    dispatch({
        type: types.CONTACT_INIT,
        data: data
    })
)


