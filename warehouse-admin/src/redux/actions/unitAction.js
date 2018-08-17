import * as types from './actionTypes.js';
import message from "antd/es/message/index";
import axiosUtil from "../../utils/axiosUtil";

const UnitAddAction = data => ({
    type: types.UNIT_ADD,
    data
});
const addUnit = (unitModel) => (dispatch) => {
    try {
        return axiosUtil.post('/api/unit/save/-1', unitModel)
            .then(response => {
                let {status} = response;
                if (status === 200 && response.data.code === 1) {
                    dispatch(
                        UnitAddAction({
                            tableData: response.data.data
                        })
                    );
                    message.success('添加成功');
                    return Promise.resolve();
                }
                return Promise.reject(response.data.message);
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            })
    } catch (error) {
        return {message: '添加失败'};
    }
};

const delUnit = (id) => (dispatch) => {
    try {
        return axiosUtil.delete(`/api/unit/delete/${id}`)
            .then(response => {
                let {status} = response;
                if (status === 200 && response.data.code === 1) {
                    dispatch(
                        {
                            type: types.UNIT_DEL,
                            payload: id
                        }
                    )
                    message.success('删除成功');
                    return Promise.resolve();
                }
                return Promise.reject(response.data.message);
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            })
    } catch (error) {
        return {message: '添加失败'};
    }
};

export {addUnit, delUnit};