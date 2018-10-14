import {types} from './menuAction';
import * as _ from "lodash";

const initMenuState = {
    selectedKey: 'home'
};

const MenuReducer = (state = initMenuState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case types.UPDATE_SELECTED_KEY:
            newState.selectedKey = action.data;
            break;
    }
    return newState;
};

export default MenuReducer;