import React from 'react';
import {Table, Icon, Divider, Button, Switch, Popconfirm, message} from 'antd';

import './index.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/User/userAction";
import UserForm from "../../components/UserForm";
import UserModel from "../../model/UserModel";
import {ISearchForm} from "../../components/Commons";

class UserRdx extends React.Component {
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
        let {getUsers} = this.actions;
        getUsers(this.props.pagination).then(() => {
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
            title: '账号',
            dataIndex: 'username'
        }, {
            title: '姓名',
            dataIndex: 'name'
        }, {
            title: '手机号',
            dataIndex: 'phone'
        },{
            title: '最近登录时间',
            dataIndex: 'lastAccessTime'
        }, {
            title: '状态',
            dataIndex: 'active',
            render: (value, record) => (
                record.adminInd > 0 ? null: <Switch checked={value > 0} onChange={(checked) => this.handleActiveChange(checked, record)}/>
            )

        }];
    }

    handleAdd = () => {
        this.setState({
            modalForm:  <UserForm/>
        });
        let {updateUserModal} = this.actions;
        updateUserModal({
            visible: true,
            confirmLoading: false,
            ...UserModel
        });
    }

    handleDelete = (record) => {
        let {delUser} = this.actions;
        if(record.adminInd > 0) {
            message.error("不能删除管理员账号");
        } else {
            delUser(record.key)
        }
    }

    handleEdit = (record) => {
        this.setState({
            modalForm:  <UserForm/>
        });
        let {updateUserModal} = this.actions;
        updateUserModal({
            visible: true,
            confirmLoading: false,
            id: record.id,
            username: record.username,
            name: record.name,
            password: record.password,
            phone: record.phone
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        let pager = {...this.props.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        let {getUsers} = this.actions;
        getUsers(pager).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    handleActiveChange = (checked, record) => {
        let {saveUser} = this.actions;
        saveUser({
            id: record.id,
            active: checked ? 1 : 0
        });
    }

    handleSearch = (values) => {
        this.setState({
            loading: true
        })
        let {getUsers} = this.actions;
        getUsers({...this.props.pagination, queryValue: values.queryValue}).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    render() {
        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <div>
                        <ISearchForm handleSearch={this.handleSearch} placeholder={'请输入账号、姓名或者手机号'}/>
                    </div>
                    <Button type="primary" onClick={this.handleAdd}>新增用户</Button>
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
    tableList: state.UserReducer.tableList,
    pagination: state.UserReducer.pagination
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
});
const User = connect(mapStateToProps, mapDispatchToProps)(UserRdx);
export default User;