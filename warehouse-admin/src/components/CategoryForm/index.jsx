import React from 'react';
import {Modal, Form, Input, TreeSelect} from 'antd';

import './index.css';
import * as actions from "../../redux/actions/categoryAction";
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

class CategoryFormRdx extends React.Component {

    constructor(props) {
        super(props);
        this.actions = this.props.actions;
    }

    componentDidMount() {
    }

    handleOk = () => {
        let {updateCategoryModal, saveCategory, getCategories} = this.props.actions;

        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            updateCategoryModal({confirmLoading: true});
            saveCategory({...values, type: this.props.selectedType}).then(() => {
                updateCategoryModal({visible: false, confirmLoading: false});
                getCategories({...this.props.pagination, type: this.props.selectedType});
                form.resetFields();
            })
        });
    }

    handleCancel = () => {
        let {updateCategoryModal} = this.props.actions;
        updateCategoryModal({
            visible: false
        });
        this.props.form.resetFields();
    }

    handleNodeSelect = (value, node) => {
        console.log('handleTreeChange', value, node);
        let {updateCategoryModal} = this.props.actions;
        updateCategoryModal({
            level: node.props.level
        })
    }

    render() {
        let {title, visible, confirmLoading, id, name, code, level, parentId} = this.props.modal;
        let {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Modal
                    okText='确定'
                    cancelText='取消'
                    width={400}
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
                        <Form.Item style={{display: 'none'}}>
                            {getFieldDecorator('parent.level', {
                                initialValue: level
                            })(
                                <Input type={'hidden'}/>
                            )}
                        </Form.Item>
                        <Form.Item label="父类别" {...formItemLayout}>
                            {getFieldDecorator('parent.id', {
                                initialValue: parentId != null? parentId: undefined
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
                        <Form.Item label="类别名称" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: name,
                                rules: [{required: true, message: '请输入类别名称'}, {max: 20, message: '类别名称不能超过20个字符'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="类别编码" {...formItemLayout}>
                            {getFieldDecorator('code', {
                                initialValue: code,
                                rules: [{required: true, message: '请输入类别编码'}, {max: 20, message: '类别编码不能超过20个字符'}],
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
    modal: state.CategoryReducer.modal,
    treeData: state.CategoryReducer.treeData,
    pagination: state.CategoryReducer.pagination,
    selectedType: state.CategoryReducer.selectedType,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
});
const CategoryForm = connect(mapStateToProps, mapDispatchToProps)(CategoryFormRdx);
export default Form.create()(CategoryForm);
