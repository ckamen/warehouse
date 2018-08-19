import {types} from '../actions/loginAction';

const initUserState = {
    LoginUser: {
        username: '',
        token: ''
    }
};

const LoginReducer = (state = initUserState, action) => {
    switch (action.type) {
        case types.LOGIN_IN:
            return Object.assign(
                {},
                ...state,
                action.data,
            );
        case types.LOGIN_OUT:
            return Object.assign(
                {},
                ...state,
                action.data,
            );
        default:
            return state;
    }
};

export default LoginReducer;