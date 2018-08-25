import React from 'react';
import {Modal, Form, Input} from 'antd';

import './index.css';
import {saveUser, updateUserModal} from "../../redux/User/userAction";
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

class UserFormRdx extends React.Component {

    constructor(props) {
        super(props);
        this.actions = this.props.actions;
    }

    handleOk = () => {
        let {updateUserModal, saveUser} = this.props.actions;

        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            updateUserModal({confirmLoading: true});
            let {id, active} = this.props.modal;
            saveUser({...values, id, active}).then(() => {
                updateUserModal({visible: false, confirmLoading: false});
                form.resetFields();
            })
        });
    }

    handleCancel = () => {
        let {updateUserModal} = this.props.actions;
        updateUserModal({
            visible: false
        });
        this.props.form.resetFields();
    }

    render() {
        let {title, visible, confirmLoading, name, username, password, phone} = this.props.modal;
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
                        <Form.Item label="账号" {...formItemLayout}>
                            {getFieldDecorator('username', {
                                initialValue: username,
                                rules: [{required: true, message: '请输入账号'}, {max: 30, message: '账号不能超过30个字符'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="姓名" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: name,
                                rules: [{required: true, message: '请输入姓名'}, {max: 30, message: '姓名不能超过30个字符'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="密码" {...formItemLayout}>
                            {getFieldDecorator('password', {
                                initialValue: password,
                                rules: [{required: true, message: '请输入密码'}, {max: 30, message: '密码不能超过30个字符'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="手机" {...formItemLayout}>
                            {getFieldDecorator('phone', {
                                initialValue: phone,
                                rules: [{required: true, message: '请输入手机号'}, {max: 30, message: '手机号不能超过30个字符'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    modal: state.UserReducer.modal
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({saveUser, updateUserModal}, dispatch)
});
const UserForm = connect(mapStateToProps, mapDispatchToProps)(UserFormRdx);
export default Form.create()(UserForm);
