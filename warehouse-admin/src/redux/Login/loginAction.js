import message from "antd/es/message/index";
import axiosUtil from "../../utils/axiosUtil";
import {AJAX_SUCCESS} from "../../utils/constants";

export const types = {
    LOGIN_IN: 'LOGIN_IN',
    LOGIN_OUT: 'LOGIN_OUT'
}

const loginAction = data => ({
    type: types.LOGIN_IN,
    data
});
export const login = ({username, password}) => (dispatch) => {
    return axiosUtil.post('/login', {username, password})
        .then(result => {
            if (result.code === AJAX_SUCCESS) {
                let token = result.data.token;
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('token', token);
                dispatch(
                    loginAction({
                        username: username,
                        token: token
                    })
                );
                message.success('登陆成功');
            }
            return Promise.resolve(result);
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        })
};

