import {Modal} from 'antd';
import axiosUtil from "./axiosUtil";
import {AJAX_SUCCESS} from "./constants";

export const showConfirm = (config) => {
    Object.assign(config, {
        okText: '确定',
        cancelText: '取消'
    })
    Modal.confirm(config);
}

export const numberOrUndefined = (value) => value > 0 ? value.toString() : undefined;

export const validateUnique = (url, msg, callback) => {
    axiosUtil.get(url).then(result => {
        if (result.code === AJAX_SUCCESS) {
            if (result.data) {
                callback(msg);
            } else {
                callback();
            }
        }
    });
}