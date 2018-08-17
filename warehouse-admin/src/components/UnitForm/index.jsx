import React from 'react';
import {Modal, Button} from 'antd';

import './index.css';


class UnitForm extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        const {title, visible, confirmLoading, onOk, onCancel} = this.props;
        return (
            <div>
                <Modal title={title}
                       visible={visible}
                       confirmLoading={confirmLoading}
                       onOk={onOk}
                       onCancel={onCancel}
                >
                    <p>{'test'}</p>
                </Modal>
            </div>
        );
    }
}

export default UnitForm;