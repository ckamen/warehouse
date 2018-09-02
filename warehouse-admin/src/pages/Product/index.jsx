import React from 'react';
import {Table, Icon, Divider, Button, Switch, Popconfirm} from 'antd';

import './index.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/Product/productAction";
import ProductForm from "../../components/ProductForm";
import {ProductModel} from "../../model/ProductModel";
import {ISearchForm} from "../../components/Commons";
import {updateImportModal} from "../../redux/Import/importAction";
import ImportModal from "../../components/import";

class ProductRdx extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
        this.state = {
            loading: true,
            modalForm: null,
            importModal: null
        }
        this.buildColumns();
    }

    componentDidMount() {
        let {getProducts} = this.actions;
        getProducts(this.props.pagination).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    buildColumns() {
        this.columns = [{
            title: '操作',
            key: 'action',
            align: 'center',
            width: '100px',
            render: (value, record) => (
                <span>
                    <a href="javascript:void(0);" title={'编辑'} onClick={() => this.handleEdit(record)}><Icon
                        type={'edit'}/></a>
                    <Divider type="vertical"/>
                    <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record)}>
                        <a href="javascript:void(0);" title={'删除'}>
                            <Icon type={'delete'}/></a>
                    </Popconfirm>
                </span>
            ),
        }, {
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
            title: '适用装置',
            dataIndex: 'device'
        }, {
            title: '参数',
            dataIndex: 'parameter'
        }, {
            title: '当前库存',
            dataIndex: 'prodWh.inventory'
        }, {
            title: '单位',
            dataIndex: 'unitName'
        }, {
            title: '库存下限',
            dataIndex: 'prodWh.minInventory',
            render: value => value >= 0 ? value : ''
        }, {
            title: '库存上限',
            dataIndex: 'prodWh.maxInventory',
            render: value => value >= 0 ? value : ''
        }, {
            title: '状态',
            dataIndex: 'active',
            render: (value, record) => (
                <Switch checked={value > 0} onChange={(checked) => this.handleActiveChange(checked, record)}/>
            )

        }];
    }

    handleAdd = () => {
        this.setState({
            modalForm: <ProductForm/>
        })
        let {updateProductModal} = this.actions;
        updateProductModal({
            visible: true,
            confirmLoading: false,
            ...ProductModel
        });
    }

    handleDelete = (record) => {
        let {delProduct} = this.actions;
        delProduct(record.key)
    }

    handleEdit = (record) => {
        this.setState({
            modalForm: <ProductForm/>
        })
        let {updateProductModal} = this.actions;
        updateProductModal({
            visible: true,
            confirmLoading: false,
            ...record
        });
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

    handleActiveChange = (checked, record) => {
        console.log('handleActiveChange', checked, record);
        let {saveProduct} = this.actions;
        saveProduct({
            id: record.id,
            active: checked ? 1 : 0
        });
    }

    handleSearch = (values) => {
        this.setState({
            loading: true
        })
        let {getProducts} = this.actions;
        getProducts({...this.props.pagination, queryValue: values.queryValue}).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    handleImport = () => {
        this.setState({
            importModal: <ImportModal/>
        });
        let {updateImportModal} = this.actions;
        updateImportModal({
            visible: true
        });
    }

    handleExport = () => {

    }

    render() {
        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <div>
                        <ISearchForm handleSearch={this.handleSearch}/>
                    </div>
                    <div className={'btn-area'}>
                        <Button icon="download" onClick={this.handleImport}>导入商品</Button>
                        <Button icon="export" onClick={this.handleExport}>导出商品</Button>
                        <Button type="primary" onClick={this.handleAdd}>新增商品</Button>
                    </div>
                </h3>
                <div>
                    <div>
                        <Table columns={this.columns}
                               dataSource={this.props.tableList}
                               pagination={this.props.pagination}
                               loading={this.state.loading}
                               onChange={this.handleTableChange}
                               bordered={true}/>
                    </div>
                </div>
                {this.state.modalForm}
                {this.state.importModal}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tableList: state.ProductReducer.tableList,
    pagination: state.ProductReducer.pagination
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions, updateImportModal}, dispatch)
});
const Product = connect(mapStateToProps, mapDispatchToProps)(ProductRdx);
export default Product;