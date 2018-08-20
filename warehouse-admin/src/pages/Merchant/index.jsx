import React from 'react';
import {Table, Icon, Divider, Button, Switch} from 'antd';

import './index.css';
import utils from "../../utils/utils";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions/merchantAction";
import MerchantForm from "../../components/MerchantForm";
import {SUPPLIER} from "../../utils/constants";

class MerchantRdx extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.actions = this.props.actions;
        this.state = {
            loading: true,
            title: this.props.type === SUPPLIER ? '供应商': '客户'
        }
    }

    componentDidMount() {
        let {getMerchants} = this.actions;
        getMerchants({...this.props.pagination, type: this.props.type}).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    handleAdd = () => {
        let {updateMerchantModal} = this.actions;
        updateMerchantModal({
            title: '新增' + this.state.title,
            visible: true,
            id: -1,
            name: '',
            code: '',
            categoryId: undefined,
            remark: '',
            active: 1
        });
    }

    handleDelete = (record) => {
        let {delMerchant} = this.actions;
        utils.showConfirm({
            title: '删除确认',
            content: `确认要删除该${this.state.title}吗？`,
            onOk() {
                return new Promise(resolve => {
                    delMerchant(record.key).then(() => resolve());
                })
            }
        });

    }

    handleEdit = (record) => {
        let {updateMerchantModal} = this.actions;
        updateMerchantModal({
            title: '编辑' + this.state.title,
            visible: true,
            id: record.id,
            name: record.name,
            code: record.code,
            categoryId: record.categoryId+'',
            remark: record.remark,
            active: record.active
        });
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
        const columns = [{
            title: '操作',
            key: 'action',
            align: 'center',
            width: '100px',
            render: (value, record) => (
                <span>
                    <a href="javascript:void(0);" title={'编辑'} onClick={() => this.handleEdit(record)}><Icon
                        type={'edit'}/></a>
                    <Divider type="vertical"/>
                    <a href="javascript:void(0);" title={'删除'} onClick={() => this.handleDelete(record)}><Icon
                        type={'delete'}/></a>
                </span>
            ),
        }, {
            title: `${this.state.title}编号`,
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

        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <Button type="primary" onClick={this.handleAdd}>{`新增${this.state.title}`}</Button>
                </h3>
                <div>
                    <div>
                        <Table columns={columns}
                               dataSource={this.props.tableList}
                               pagination={this.props.pagination}
                               loading={this.state.loading}
                               onChange={this.handleTableChange}
                               bordered={true}/>
                    </div>
                </div>
                <MerchantForm type={this.props.type}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tableList: state.MerchantReducer.tableList,
    pagination: state.MerchantReducer.pagination
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
});
const Merchant = connect(mapStateToProps, mapDispatchToProps)(MerchantRdx);
export default Merchant;