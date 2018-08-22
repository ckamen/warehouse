import React from 'react';
import {Table, Icon, Divider, Button, Switch, Popconfirm} from 'antd';

import './index.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions/warehouseAction";
import WarehouseForm from "../../components/WarehouseForm";
import WarehouseModel from "../../model/WarehouseModel";

class WarehouseRdx extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
        this.state = {
            loading: true
        }
        this.buildColumns();
    }

    componentDidMount() {
        let {getWarehouses} = this.actions;
        getWarehouses(this.props.pagination).then(() => {
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
            title: '仓库编码',
            dataIndex: 'code'
        }, {
            title: '仓库名称',
            dataIndex: 'name'
        }, {
            title: '货架数量',
            dataIndex: 'rackNum'
        }, {
            title: '状态',
            dataIndex: 'active',
            render: (value, record) => (
                <Switch checked={value > 0} onChange={(checked) => this.handleActiveChange(checked, record)}/>
            )

        }];
    }

    handleAdd = () => {
        let {updateWarehouseModal} = this.actions;
        updateWarehouseModal({
            visible: true,
            confirmLoading: false,
            ...WarehouseModel
        });
    }

    handleDelete = (record) => {
        let {delWarehouse} = this.actions;
        delWarehouse(record.key)
    }

    handleEdit = (record) => {
        let {updateWarehouseModal} = this.actions;
        updateWarehouseModal({
            visible: true,
            confirmLoading: false,
            id: record.id,
            code: record.code,
            name: record.name,
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        let pager = {...this.props.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        let {getWarehouses} = this.actions;
        getWarehouses(pager).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    handleActiveChange = (checked, record) => {
        console.log('handleActiveChange', checked, record);
        let {saveWarehouse} = this.actions;
        saveWarehouse({
            id: record.id,
            active: checked ? 1 : 0
        });
    }

    render() {


        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <Button type="primary" onClick={this.handleAdd}>新增仓库</Button>
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
                <WarehouseForm/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tableList: state.WarehouseReducer.tableList,
    pagination: state.WarehouseReducer.pagination
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
});
const Warehouse = connect(mapStateToProps, mapDispatchToProps)(WarehouseRdx);
export default Warehouse;