import React from 'react';
import {Table, Icon, Divider, Button, Switch, Popconfirm} from 'antd';

import './index.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/Brand/brandAction";
import BrandForm from "../../components/BrandForm";

class BrandRdx extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
        this.state = {
            loading: true,
            modalForm: null
        }
        this.buildColumns();
    }

    componentDidMount() {
        let {getBrands} = this.actions;
        getBrands(this.props.pagination).then(() => {
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
            title: '品牌编码',
            dataIndex: 'code'
        }, {
            title: '品牌名称',
            dataIndex: 'name'
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
            modalForm:  <BrandForm/>
        });
        let {updateBrandModal} = this.actions;
        updateBrandModal({
            visible: true,
            id: -1,
            name: '',
            code: ''
        });
    }

    handleDelete = (record) => {
        let {delBrand} = this.actions;
        delBrand(record.key);
    }

    handleEdit = (record) => {
        this.setState({
            modalForm:  <BrandForm/>
        });
        let {updateBrandModal} = this.actions;
        updateBrandModal({
            visible: true,
            id: record.id,
            name: record.name,
            code: record.code
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        let pager = {...this.props.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        let {getBrands} = this.actions;
        getBrands(pager).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    handleActiveChange = (checked, record) => {
        let {saveBrand} = this.actions;
        saveBrand({
            id: record.id,
            active: checked ? 1 : 0
        });
    }

    render() {


        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <Button type="primary" onClick={this.handleAdd}>新增品牌</Button>
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
            </div>
        )
    }
}

const mapStateToProps = reducers => ({
    tableList: reducers.BrandReducer.tableList,
    pagination: reducers.BrandReducer.pagination
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
});
const Brand = connect(mapStateToProps, mapDispatchToProps)(BrandRdx);
export default Brand;
