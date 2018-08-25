import message from "antd/es/message/index";
import axiosUtil from "../../utils/axiosUtil";

export const types = {
    LOGIN_IN: 'LOGIN_IN',
    LOGIN_OUT: 'LOGIN_OUT'
}

const LoginAction = data => ({
    type: types.LOGIN_IN,
    data
});
export const login = ({username, password}) => (dispatch) => {
    try {
        return axiosUtil.post('/login', {username, password})
            .then(response => {
                let {status} = response;
                if (status === 200 && response.data.code === 1) {
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('token', response.data.data.token);
                    dispatch(
                        LoginAction({
                            LoginUser: {
                                username: username,
                                token: response.data.data.token
                            }
                        })
                    );
                    message.success('登陆成功');
                    return Promise.resolve();
                }
                return Promise.reject(response.data.message);
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            })
    } catch (error) {
        return {message: '登陆失败'};
    }
};

