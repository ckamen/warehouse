import React from 'react';
import {Modal, Form, Input, InputNumber} from 'antd';

import './index.css';
import {saveWarehouse, updateWarehouseModal} from "../../redux/Warehouse/warehouseAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

class WarehouseFormRdx extends React.Component {

    constructor(props) {
        super(props);
        this.actions = this.props.actions;
    }

    handleOk = () => {
        let {updateWarehouseModal, saveWarehouse} = this.props.actions;

        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            updateWarehouseModal({confirmLoading: true});
            let {id, active} = this.props.modal;
            saveWarehouse({...values, id, active}).then(() => {
                updateWarehouseModal({visible: false, confirmLoading: false});
                form.resetFields();
            });
        });
    }

    handleCancel = () => {
        let {updateWarehouseModal} = this.props.actions;
        updateWarehouseModal({
            visible: false
        });
        this.props.form.resetFields();
    }

    render() {
        let {title, visible, confirmLoading, name, code, rackNum} = this.props.modal;
        let {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Modal
                    okText='确定'
                    cancelText='取消'
                    width = {400}
                    maskClosable={false}
                    title={title}
                    visible={visible}
                    confirmLoading={confirmLoading}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form layout="inline" className={'modal-form'}>
                        <Form.Item label="仓库编码" {...formItemLayout}>
                            {getFieldDecorator('code', {
                                initialValue: code,
                                rules: [{required: true, message: '请输入仓库编码'}, {max: 30, message: '仓库编码不能超过30个字符'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="仓库名称" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: name,
                                rules: [{required: true, message: '请输入仓库名称'}, {max: 30, message: '仓库名称不能超过30个字符'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="货架数量" {...formItemLayout}>
                            {getFieldDecorator('rackNum', {
                                initialValue: rackNum,
                                rules: [{required: true, message: '货架数量不能为空'}],
                            })(
                                <InputNumber/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    modal: state.WarehouseReducer.modal
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({saveWarehouse, updateWarehouseModal}, dispatch)
});
const WarehouseForm = connect(mapStateToProps, mapDispatchToProps)(WarehouseFormRdx);
export default Form.create()(WarehouseForm);
