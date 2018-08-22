import {Modal} from 'antd';

export const showConfirm = (config) => {
    Object.assign(config, {
        okText: '确定',
        cancelText: '取消'
    })
    Modal.confirm(config);
}

export const numberOrUndefined = (value) => value > 0 ? value.toString() : undefined;
