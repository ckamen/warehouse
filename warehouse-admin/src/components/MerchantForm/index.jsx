import React from 'react';
import {Modal, Form, Input, TreeSelect} from 'antd';

import './index.css';
import * as actions from "../../redux/actions/merchantAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
    },
};

class MerchantFormRdx extends React.Component {

    constructor(props) {
        super(props);
        this.actions = this.props.actions;
    }

    componentDidMount() {
    }

    handleOk = () => {
        let {updateMerchantModal, saveMerchant, getMerchants} = this.props.actions;

        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            updateMerchantModal({confirmLoading: true});
            saveMerchant({...values}).then(() => {
                updateMerchantModal({visible: false, confirmLoading: false});
                getMerchants({...this.props.pagination});
                form.resetFields();
            })
        });
    }

    handleCancel = () => {
        let {updateMerchantModal} = this.props.actions;
        updateMerchantModal({
            visible: false
        });
        this.props.form.resetFields();
    }

    /*handleNodeSelect = (value, node) => {
        console.log('handleTreeChange', value, node);
        let {updateMerchantModal} = this.props.actions;
        updateMerchantModal({
            level: node.props.level
        })
    }*/

    render() {
        let {title, visible, confirmLoading, id, name} = this.props.modal;
        let {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Modal
                    okText='确定'
                    cancelText='取消'
                    width={800}
                    maskClosable={false}
                    title={title}
                    visible={visible}
                    confirmLoading={confirmLoading}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form layout="inline" className={'modal-form'}>
                        <Form.Item style={{display: 'none'}}>
                            {getFieldDecorator('id', {
                                initialValue: id
                            })(
                                <Input type={'hidden'}/>
                            )}
                        </Form.Item>
                        {/*<Form.Item style={{display: 'none'}}>
                            {getFieldDecorator('parent.level', {
                                initialValue: level
                            })(
                                <Input type={'hidden'}/>
                            )}
                        </Form.Item>
                        <Form.Item label="父类别" {...formItemLayout}>
                            {getFieldDecorator('parent.id', {
                                initialValue: parentId
                            })(
                                <TreeSelect
                                    allowClear={true}
                                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                    treeData={this.props.treeData}
                                    placeholder="请选择"
                                    treeDefaultExpandAll
                                    onSelect={this.handleNodeSelect}
                                />
                            )}
                        </Form.Item>*/}
                        <Form.Item label="名称" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: name,
                                rules: [{required: true, message: '请输入名称'}, {max: 50, message: '类别名不能超过50个字符'}],
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
    modal: state.MerchantReducer.modal,
    pagination: state.MerchantReducer.pagination
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
});
const MerchantForm = connect(mapStateToProps, mapDispatchToProps)(MerchantFormRdx);
export default Form.create()(MerchantForm);
