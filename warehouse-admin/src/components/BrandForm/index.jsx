import React from 'react';
import {Modal, Form, Input} from 'antd';

import './index.css';
import {saveBrand, updateBrandModal} from "../../redux/actions/brandAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


class BrandFormRdx extends React.Component {

    constructor(props) {
        super(props);
        this.actions = this.props.actions;
    }

    handleOk = () => {
        let {updateBrandModal, saveBrand} = this.props.actions;

        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            updateBrandModal({confirmLoading: true});
            saveBrand(values).then(() => {
                updateBrandModal({visible: false, confirmLoading: false});
                form.resetFields();
            })
        });
    }

    handleCancel = () => {
        let {updateBrandModal} = this.props.actions;
        updateBrandModal({
            visible: false
        })
    }

    render() {
        let {title, visible, confirmLoading, id, name, code} = this.props.modal;
        let {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Modal
                    okText='确定'
                    cancelText='取消'
                    width = {400}
                    title={title}
                    visible={visible}
                    confirmLoading={confirmLoading}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form layout="inline">
                        <Form.Item style={{display: 'none'}}>
                            {getFieldDecorator('id', {
                                initialValue: id
                            })(
                                <Input type={'hidden'}/>
                            )}
                        </Form.Item>
                        <Form.Item label="编码">
                            {getFieldDecorator('code', {
                                initialValue: code,
                                rules: [{required: true, message: '请输入编码'}, {max: 20, message: '名称不能超过20个字符'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="名称">
                            {getFieldDecorator('name', {
                                initialValue: name,
                                rules: [{required: true, message: '请输入名称'}, {max: 50, message: '名称不能超过50个字符'}],
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
    modal: state.BrandReducer.modal
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({saveBrand, updateBrandModal}, dispatch)
});
const BrandForm = connect(mapStateToProps, mapDispatchToProps)(BrandFormRdx);
export default Form.create()(BrandForm);
