import {types} from './loginAction';
import * as _ from "lodash";

const initUserState = {
    loginUser: {
        username: '',
        token: ''
    }
};

const LoginReducer = (state = initUserState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case types.LOGIN_IN:
            newState.loginUser = action.data;
            break;
        case types.LOGIN_OUT:
           break;
    }
    console.log(action);
    return newState;
};

export default LoginReducer;