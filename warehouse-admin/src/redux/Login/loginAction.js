import message from "antd/es/message/index";
import axiosUtil from "../../utils/axiosUtil";

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
        .then(data => {
            console.log('hereee');
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('token', data.token);
            dispatch(
                loginAction({
                    username: username,
                    token: data.token
                })
            );
            message.success('登陆成功');
            return Promise.resolve();
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        })
};

