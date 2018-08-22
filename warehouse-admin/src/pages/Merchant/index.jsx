import React from 'react';
import {Table, Icon, Divider, Button, Switch, Popconfirm} from 'antd';

import './index.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions/merchantAction";
import MerchantForm from "../../components/MerchantForm";
import {SUPPLIER} from "../../utils/constants";
import {getContacts, initContact} from "../../redux/actions/contactAction";

class MerchantRdx extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
        this.state = {
            loading: true,
            title: this.props.type === SUPPLIER ? '供应商' : '客户',
            modalForm: null
        }
        this.buildColumns();
    }

    componentDidMount() {
        let {getMerchants} = this.actions;
        getMerchants({...this.props.pagination, type: this.props.type}).then(() => {
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
            title: `${this.state.title}编码`,
            dataIndex: 'code'
        }, {
            title: `${this.state.title}名称`,
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
            modalForm: <MerchantForm type={this.props.type}/>
        });
        let {updateMerchantModal, initContact} = this.actions;
        updateMerchantModal({
            title: '新增' + this.state.title,
            visible: true,
            id: -1,
            name: '',
            code: '',
            categoryId: null,
            remark: '',
            active: 1
        });
        initContact();
    }

    handleDelete = (record) => {
        let {delMerchant} = this.actions;
        delMerchant(record.key);
    }

    handleEdit = (record) => {
        this.setState({
            modalForm: <MerchantForm type={this.props.type}/>
        });
        let {updateMerchantModal, getContacts} = this.actions;
        updateMerchantModal({
            title: '编辑' + this.state.title,
            visible: true,
            id: record.id,
            name: record.name,
            code: record.code,
            categoryId: record.categoryId + '',
            remark: record.remark,
            active: record.active
        });
        getContacts({
            merchantId: record.id
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        let pager = {...this.props.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        let {getMerchants} = this.actions;
        getMerchants({...pager, type: this.props.type}).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    handleActiveChange = (checked, record) => {
        let {saveMerchant} = this.actions;
        saveMerchant({
            id: record.id,
            active: checked ? 1 : 0
        });
    }

    render() {
        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <Button type="primary" onClick={this.handleAdd}>{`新增${this.state.title}`}</Button>
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

const mapStateToProps = state => ({
    tableList: state.MerchantReducer.tableList,
    pagination: state.MerchantReducer.pagination
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions, initContact, getContacts}, dispatch)
});
const Merchant = connect(mapStateToProps, mapDispatchToProps)(MerchantRdx);
export default Merchant;