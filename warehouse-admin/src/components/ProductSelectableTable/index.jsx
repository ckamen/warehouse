import React from 'react';
import {Modal, Form, Input, Row, Col, Button, Table, message} from 'antd';

import './index.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getProducts, updateProductSelectModal} from "../../redux/Product/productAction";
import {ISelect} from "../Commons";
import {MAX_SIZE} from "../../utils/constants";
import {getWarehouses} from "../../redux/Warehouse/warehouseAction";
import {selectProductWarehousing} from "../../redux/Warehousing/warehousingAction";


class ProductSelectableTableRdx extends React.Component {

    constructor(props) {
        super(props);
        this.actions = this.props.actions;
        this.state = {
            loading: false,
            selectedRowKeys: [],
        }
        this.buildColumns();
    }

    componentDidMount() {
        let {getProducts, getWarehouses} = this.actions;
        this.setState({
            loading: true
        })
        getProducts({...this.props.pagination}).then(() => {
            this.setState({
                loading: false
            })
        });
        getWarehouses({pageSize: MAX_SIZE});
    }

    buildColumns() {
        this.columns = [{
            title: '商品编码',
            dataIndex: 'code'
        }, {
            title: '规格型号',
            dataIndex: 'specification'
        }, {
            title: '供应商',
            dataIndex: 'supplierName'
        }, {
            title: '商品类别',
            dataIndex: 'categoryName'
        }, {
            title: '单位',
            dataIndex: 'unitName'
        }, {
            title: '可用库存',
            dataIndex: 'prodWh.inventory'
        }, {
            title: '参数',
            dataIndex: 'parameter'
        }, {
            title: '适用装置',
            dataIndex: 'device'
        }];
    }

    handleOk = () => {
        let keys = this.state.selectedRowKeys;
        if (keys.length > 0) {
            let {updateProductSelectModal, selectProductWarehousing} = this.props.actions;
            let product = this.props.tableList.find(data => data.key === keys[0]);
            selectProductWarehousing({...product, key: this.props.editKey});
            updateProductSelectModal({
                visible: false
            });
            this.setState({
                selectedRowKeys: []
            });
            this.props.form.resetFields();
        } else {
            message.warning('请选择一种商品');
        }
    }

    handleCancel = () => {
        let {updateProductSelectModal} = this.props.actions;
        updateProductSelectModal({
            visible: false
        });
        this.props.form.resetFields();
    }

    handleTableChange = (pagination, filters, sorter) => {
        let pager = {...this.props.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        let {getProducts} = this.actions;
        getProducts(pager).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    handleSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    }

    handleWarehouseChange = (value, option) => {
        this.setState({
            loading: true
        })
        let {getProducts} = this.actions;
        getProducts({...this.props.pagination, 'warehouseId': value}).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    handleSearch = () => {
        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.setState({
                loading: true
            })
            let {getProducts} = this.actions;
            getProducts({...this.props.pagination, ...values}).then(() => {
                this.setState({
                    loading: false
                })
            });
        });
    }

    render() {
        let {title, visible} = this.props.modal;
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.handleSelectChange,
        };
        let {getFieldDecorator} = this.props.form;

        return (
            <Modal
                width={900}
                maskClosable={false}
                title={title}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form layout="inline" className={'modal-form'}>
                    <Row>
                        <Col span={8}>
                            <Form.Item wrapperCol={{span: 24}}>
                                {getFieldDecorator('queryValue', {
                                    initialValue: '',
                                    rules: [{max: 50, message: '输入不能超过50个字符'}],
                                })(
                                    <Input placeholder={'请输入商品编码或者型号'} onPressEnter={this.handleSearch}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="仓库" labelCol={{span: 6}} wrapperCol={{span: 18}}>
                                {getFieldDecorator('warehouseId', {})(
                                    <ISelect data={this.props.warehouses} onChange={this.handleWarehouseChange}
                                             allowClear style={{width: '80%'}}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item wrapperCol={{span: 24}}>
                                <Button icon={'search'} onClick={this.handleSearch}>查询</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <div style={{marginTop: 10}}>
                    <Table columns={this.columns}
                           dataSource={this.props.tableList}
                           pagination={this.props.pagination}
                           loading={loading}
                           rowSelection={rowSelection}
                           onChange={this.handleTableChange}
                           bordered={true}/>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    tableList: state.ProductReducer.tableList,
    pagination: state.ProductReducer.pagination,
    modal: state.ProductReducer.selectableModal,
    warehouses: state.WarehouseReducer.tableList,
    editKey: state.WarehousingReducer.editKey
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({getProducts, getWarehouses, updateProductSelectModal, selectProductWarehousing}, dispatch)
});
const ProductSelectableTable = connect(mapStateToProps, mapDispatchToProps)(ProductSelectableTableRdx);
export default Form.create()(ProductSelectableTable);
