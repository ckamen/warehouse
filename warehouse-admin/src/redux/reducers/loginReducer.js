import {
    LOGIN_IN,
    LOGIN_OUT,
} from '../actions/actionTypes.js';

const initUserState = {
    LoginUser: {
        username: '',
        token: ''
    }
};

const LoginReducer = (state = initUserState, action) => {
    switch (action.type) {
        case LOGIN_IN:
            return Object.assign(
                {},
                ...state,
                action.data,
            );
        case LOGIN_OUT:
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