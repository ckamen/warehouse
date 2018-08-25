import axiosUtil from "../../utils/axiosUtil";
import {message} from "antd";
import {MAX_SIZE} from "../../utils/constants";

export const types = {
    UNIT_PAGE: 'UNIT_PAGE',
    UNIT_ADD: 'UNIT_ADD',
    UNIT_EDIT: 'UNIT_EDIT',
    UNIT_DEL: 'UNIT_DEL',
    UNIT_MODAL_UPDATE: 'UNIT_MODAL_UPDATE'
}

const UnitAddAction = data => ({
    type: types.UNIT_ADD,
    data
});

const UnitEditAction = data => ({
    type: types.UNIT_EDIT,
    data
});

const getUnits = () => (dispatch) => {
    return axiosUtil.get('/api/unit/page', {
        params: {
            limit: MAX_SIZE
        }
    }).then(data => {
        dispatch({
            type: types.UNIT_PAGE,
            data: data.records
        });
        return Promise.resolve();
    })
};

const saveUnit = ({id, ...rest}) => (dispatch) => {
    return axiosUtil.post(`/api/unit/save/${id}`, {id, ...rest})
        .then(data => {
            if (id > 0) {
                dispatch(UnitEditAction(data));
            } else {
                dispatch(UnitAddAction(data));
            }
            message.success('保存成功');
            return Promise.resolve();
        });
};

const delUnit = (id) => (dispatch) => {
    return axiosUtil.delete(`/api/unit/delete/${id}`)
        .then(() => {
            dispatch(
                {
                    type: types.UNIT_DEL,
                    data: id
                }
            );
            message.success('删除成功');
            return Promise.resolve();
        });
};

const updateUnitModal = data => dispatch => (dispatch({
    type: types.UNIT_MODAL_UPDATE,
    data
}));

export {getUnits, saveUnit, delUnit, updateUnitModal};