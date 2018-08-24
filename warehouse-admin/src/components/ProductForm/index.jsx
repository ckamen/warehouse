import React from 'react';
import {Modal, Form, Input, Row, Col, TreeSelect, Select, InputNumber} from 'antd';

import './index.css';
import {saveProduct, updateProductModal, updateRacks} from "../../redux/actions/productAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCategories} from "../../redux/actions/categoryAction";
import {MAX_SIZE, SUPPLIER} from "../../utils/constants";
import {getMerchants} from "../../redux/actions/merchantAction";
import {getUnits} from "../../redux/actions/unitAction";
import {getWarehouses} from "../../redux/actions/warehouseAction";
import {numberOrUndefined} from "../../utils/utils";
import {ISelect} from "../Commons";

const {Option} = Select;

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



class ProductFormRdx extends React.Component {

    constructor(props) {
        super(props);
        this.actions = this.props.actions;
        this.codeModel = {
            supplierCode: '',
            categoryCode: '',
            warehouseCode: '',
            rackCode: '',
            layerNum: '',
            positionNum: ''
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        let {getCategories, getMerchants, getUnits, getWarehouses} = this.actions;
        getCategories({pageSize: MAX_SIZE, type: 3});
        getMerchants({pageSize: MAX_SIZE, type: SUPPLIER});
        getWarehouses({pageSize: MAX_SIZE});
        getUnits();
    }


    handleOk = () => {
        let {updateProductModal, saveProduct} = this.props.actions;

        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            updateProductModal({confirmLoading: true});
            let {id, active} = this.props.modal;
            saveProduct({...values, id, active}).then(() => {
                updateProductModal({visible: false, confirmLoading: false});
                form.resetFields();
            });
        });
    }

    handleCancel = () => {
        let {updateProductModal} = this.props.actions;
        updateProductModal({
            visible: false
        });
        this.props.form.resetFields();
    }

    handleWarehouseChange = (value, option) => {
        let {updateRacks} = this.actions;
        let {record} = option.props;
        updateRacks(record.rackNum);
        this.props.form.setFieldsValue({'prodWh.rackCode': ''});
        this.codeModel = {...this.codeModel, warehouseCode: record.code, rackCode: ''};
        this.updateCode();
    }

    handleRackChange = (value) => {
        this.codeModel = {...this.codeModel, rackCode: value};
        this.updateCode();
    }

    handleLayerChange = (value) => {
        this.codeModel = {...this.codeModel, layerNum: value > 9 ? value : '0' + value};
        this.updateCode();
    }

    handlePositionChange = (value) => {
        this.codeModel = {...this.codeModel, positionNum: value > 9 ? value : '0' + value};
        this.updateCode();
    }

    handleSupplierChange = (value, option) => {
        let {record} = option.props;
        this.codeModel = {...this.codeModel, supplierCode: record.code};
        this.updateCode();
    }

    handleCategorySelect = (value, node) => {
        this.codeModel = {...this.codeModel, categoryCode: node.props.code};
        this.updateCode();
    }

    updateCode = () => {
        let {setFieldsValue} = this.props.form;
        setFieldsValue({
            code: this.codeModel.supplierCode + '-' +
            this.codeModel.categoryCode + '-' +
            this.codeModel.warehouseCode + '-' +
            this.codeModel.rackCode +
            this.codeModel.layerNum +
            this.codeModel.positionNum
        })
    }

    parseCode(code) {
        if(code) {
            let params = code.split('-');
            this.codeModel.supplierCode = params[0];
            this.codeModel.categoryCode = params[1];
            this.codeModel.warehouseCode = params[2];
            this.codeModel.rackCode = params[3].substr(0, 1);
            this.codeModel.layerNum = params[3].substr(1, 2);
            this.codeModel.positionNum = params[3].substr(3, 2);
        }
    }

    render() {
        let {
            title, visible, confirmLoading, id, name, code, categoryId, supplierId, parameter, device, remark,
            barCode, specification, unitId, preferredWarehouseId, prodWh
        } = this.props.modal;
        if(id > 0) {
            this.parseCode(code);
        }
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
                    afterClose={()=>{
                        this.codeModel = {
                            supplierCode: '',
                            categoryCode: '',
                            warehouseCode: '',
                            rackCode: '',
                            layerNum: '',
                            positionNum: ''
                        }
                    }}
                >
                    <Form layout="inline" className={'modal-form'}>

                        <Row>
                            <Col span={12}>
                                <Form.Item label="商品编码" {...formItemLayout}>
                                    {getFieldDecorator('code', {
                                        initialValue: code,
                                    })(
                                        <Input disabled={true}/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="供应商" {...formItemLayout}>
                                    {getFieldDecorator('supplierId', {
                                        initialValue: numberOrUndefined(supplierId),
                                        rules: [{required: true, message: '请选择供应商'}],
                                    })(
                                        <ISelect data={this.props.suppliers} onChange={this.handleSupplierChange}/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="规格型号" {...formItemLayout}>
                                    {getFieldDecorator('specification', {
                                        initialValue: specification,
                                        rules: [{required: true, message: '请输入规格型号'},
                                            {max: 1000, message: '规格型号不能超过1000个字符'}],
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="商品类别" {...formItemLayout}>
                                    {getFieldDecorator('categoryId', {
                                        initialValue: numberOrUndefined(categoryId),
                                        rules: [{required: true, message: '请选择商品类别'}],
                                    })(
                                        <TreeSelect
                                            allowClear={true}
                                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                            treeData={this.props.categories}
                                            placeholder="请选择"
                                            treeDefaultExpandAll
                                            onSelect={this.handleCategorySelect}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>

                            <Col span={12}>
                                <Form.Item label="期初数量" {...formItemLayout}>
                                    {getFieldDecorator('prodWh.initQuantity', {
                                        initialValue: numberOrUndefined(prodWh.initQuantity),
                                        rules: [{required: true, message: '请选择商品数量'}],
                                    })(
                                        <InputNumber min={0}/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="计量单位" {...formItemLayout}>
                                    {getFieldDecorator('unitId', {
                                        initialValue: numberOrUndefined(unitId)
                                    })(
                                        <ISelect data={this.props.units}/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>

                            <Col span={12}>
                                <Form.Item label="适用装置" {...formItemLayout}>
                                    {getFieldDecorator('device', {
                                        initialValue: device,
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="参数" {...formItemLayout}>
                                    {getFieldDecorator('parameter', {
                                        initialValue: parameter
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="默认仓库" {...formItemLayout}>
                                    {getFieldDecorator('preferredWarehouseId', {
                                        initialValue: preferredWarehouseId > 0 ? preferredWarehouseId.toString() : undefined,
                                        rules: [{required: true, message: '请选择仓库'}],
                                    })(
                                        <ISelect data={this.props.warehouses} onChange={this.handleWarehouseChange}/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="货架号" {...formItemLayout}>
                                    {getFieldDecorator('prodWh.rackCode', {
                                        initialValue: prodWh.rackCode,
                                        rules: [{required: true, message: '请选择货架号'}],
                                    })(
                                        <Select dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                                onChange={this.handleRackChange}>
                                            {this.props.racks.map(value => <Option key={value}>{value}</Option>)}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="存放层" {...formItemLayout}>
                                    {getFieldDecorator('prodWh.layerNum', {
                                        initialValue: numberOrUndefined(prodWh.layerNum),
                                        rules: [{required: true, message: '请选择存放层'}]
                                    })(
                                        <InputNumber min={1} max={99} onChange={this.handleLayerChange}/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="存放位置" {...formItemLayout}>
                                    {getFieldDecorator('prodWh.placeNum', {
                                        initialValue: numberOrUndefined(prodWh.placeNum),
                                        rules: [{required: true, message: '请选择存放位置'}]
                                    })(
                                        <InputNumber min={1} max={99} onChange={this.handlePositionChange}/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="最低库存" {...formItemLayout}>
                                    {getFieldDecorator('prodWh.minInventory', {
                                        initialValue: numberOrUndefined(prodWh.minInventory)
                                    })(
                                        <InputNumber min={0}/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="最高库存" {...formItemLayout}>
                                    {getFieldDecorator('prodWh.maxInventory', {
                                        initialValue: numberOrUndefined(prodWh.maxInventory)
                                    })(
                                        <InputNumber min={0}/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 10}}>
                            <Col span={24}>
                                <Form.Item label="备注" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                                    {getFieldDecorator('remark', {
                                        initialValue: remark
                                    })(
                                        <Input.TextArea rows={2}/>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('prodWh.id', {
                                        initialValue: prodWh.id
                                    })(
                                        <Input type={'hidden'}/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    modal: state.ProductReducer.modal,
    categories: state.CategoryReducer.treeData,
    suppliers: state.MerchantReducer.tableList,
    units: state.UnitReducer.tableList,
    warehouses: state.WarehouseReducer.tableList,
    racks: state.ProductReducer.racks
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        saveProduct, updateProductModal, updateRacks,
        getCategories, getMerchants, getUnits, getWarehouses
    }, dispatch)
});
const ProductForm = connect(mapStateToProps, mapDispatchToProps)(ProductFormRdx);
export default Form.create()(ProductForm);
