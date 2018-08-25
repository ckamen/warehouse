import React from 'react';
import {Modal, Form, Input, TreeSelect, Row, Col} from 'antd';

import './index.css';
import * as actions from "../../redux/Merchant/merchantAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCategories} from "../../redux/Category/categoryAction";
import {MAX_SIZE} from "../../utils/constants";
import ContactTable from "../ContactTable";

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
        let {getCategories} = this.actions;
        getCategories({pageSize: MAX_SIZE, type: this.props.type});
    }

    handleOk = () => {
        let {updateMerchantModal, saveMerchant} = this.props.actions;

        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            updateMerchantModal({confirmLoading: true});
            let {id, active} = this.props.modal;
            saveMerchant({...values, type: this.props.type, id, active, contacts: this.props.contacts}).then(() => {
                updateMerchantModal({visible: false, confirmLoading: false});
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

    handleNodeSelect = (value, node) => {
        console.log('handleTreeChange', value, node);
        /*let {updateMerchantModal} = this.props.actions;
        updateMerchantModal({
            level: node.props.level
        })*/
    }

    render() {
        let {title, visible, confirmLoading, code, name, categoryId, remark} = this.props.modal;
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
                        <Row>
                            <Col span={12}>
                                <Form.Item label="编码" {...formItemLayout}>
                                    {getFieldDecorator('code', {
                                        initialValue: code,
                                        rules: [{required: true, message: '请输入编码'}, {max: 30, message: '编码不能超过30个字符'}],
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="名称" {...formItemLayout}>
                                    {getFieldDecorator('name', {
                                        initialValue: name,
                                        rules: [{required: true, message: '请输入名称'}, {max: 50, message: '名称不能超过50个字符'}],
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="分类" {...formItemLayout}>
                                    {getFieldDecorator('categoryId', {
                                        initialValue: categoryId != null ? categoryId: undefined
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
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="备注" {...formItemLayout}>
                                    {getFieldDecorator('remark', {
                                        initialValue: remark,
                                        rules: [{max: 200, message: '备注不能超过200个字符'}],
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 10}}>
                            <Col span={24}>
                                <ContactTable/>
                            </Col>
                        </Row>

                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    modal: state.MerchantReducer.modal,
    pagination: state.MerchantReducer.pagination,
    treeData: state.CategoryReducer.treeData,
    contacts: state.ContactReducer.tableList
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions, getCategories}, dispatch)
});
const MerchantForm = connect(mapStateToProps, mapDispatchToProps)(MerchantFormRdx);
export default Form.create()(MerchantForm);
