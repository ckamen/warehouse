import {Modal} from 'antd';

const showConfirm = (config) => {
    Object.assign(config, {
        okText: '确定',
        cancelText: '取消'
    })
    Modal.confirm(config);
}

export default {showConfirm}
