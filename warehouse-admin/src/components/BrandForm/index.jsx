import React from 'react';
import {Modal, Form, Input} from 'antd';

import './index.css';
import {saveBrand, updateBrandModal} from "../../redux/Brand/brandAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Utils from "../../utils/utils";


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
            let {id, active} = this.props.modal;
            saveBrand({...values, id, active}).then(() => {
                updateBrandModal({visible: false, confirmLoading: false});
                form.resetFields();
            })
        });
    }

    handleCancel = () => {
        let {updateBrandModal} = this.props.actions;
        updateBrandModal({
            visible: false
        });
        this.props.form.resetFields();
    }

    validateUnique = (rule, value, callback) => {
        let {id} = this.props.modal;
        Utils.validateUnique(`/api/brand/exist/${id}?value=${value}`, '该编码已经存在系统中', callback);
    }

    render() {
        let {title, visible, confirmLoading, name, code} = this.props.modal;
        let {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Modal
                    width={400}
                    maskClosable={false}
                    title={title}
                    visible={visible}
                    confirmLoading={confirmLoading}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form layout="inline">
                        <Form.Item label="编码">
                            {getFieldDecorator('code', {
                                initialValue: code,
                                rules: [{required: true, message: '请输入编码'},
                                    {max: 20, message: '名称不能超过20个字符'},
                                    {validator: this.validateUnique}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="名称">
                            {getFieldDecorator('name', {
                                initialValue: name,
                                rules: [{required: true, message: '请输入名称'},
                                    {max: 50, message: '名称不能超过50个字符'}],
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
