import React from 'react';
import {Modal, Button, Form, Input} from 'antd';

import './index.css';
import {saveUnit, updateUnitModal} from "../../redux/actions/unitAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


class UnitFormRdx extends React.Component {

    constructor(props) {
        super(props);
        this.actions = this.props.actions;
    }

    handleOk = () => {
        let {updateUnitModal, saveUnit} = this.props.actions;

        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            updateUnitModal({confirmLoading: true});
            saveUnit(values).then(() => {
                updateUnitModal({visible: false, confirmLoading: false});
                form.resetFields();
            })
        });
    }

    handleCancel = () => {
        let {updateUnitModal} = this.props.actions;
        updateUnitModal({
            visible: false
        });
        this.props.form.resetFields();
    }

    render() {
        let {title, visible, confirmLoading, id, name} = this.props.modal;
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
                    <Form layout="inline">
                        <Form.Item>
                            {getFieldDecorator('id', {
                                initialValue: id
                            })(
                                <Input type={'hidden'}/>
                            )}
                        </Form.Item>
                        <Form.Item label="名称">
                            {getFieldDecorator('name', {
                                initialValue: name,
                                rules: [{required: true, message: '请输入名称'}, {max: 10, message: '名称不能超过10个字符'}],
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
    modal: state.UnitReducer.modal
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({saveUnit, updateUnitModal}, dispatch)
});
const UnitForm = connect(mapStateToProps, mapDispatchToProps)(UnitFormRdx);
export default Form.create()(UnitForm);
