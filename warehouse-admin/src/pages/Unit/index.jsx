import React from 'react';
import {Table, Icon, Divider, Button, Popconfirm} from 'antd';

import './index.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/Unit/unitAction";
import UnitForm from "../../components/UnitForm";

class UnitRdx extends React.Component {
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
        let {getUnits} = this.actions;
        getUnits().then(() => {
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
            title: '名称',
            dataIndex: 'name'
        }];
    }

    handleAdd = () => {
        this.setState({
            modalForm:  <UnitForm/>
        });
        let {updateUnitModal} = this.actions;
        updateUnitModal({
            visible: true,
            title: '创建计量单位',
            id: -1,
            name: ''
        });
    }

    handleDelete = (record) => {
        let {delUnit} = this.actions;
        delUnit(record.key);
    }

    handleEdit = (record) => {
        this.setState({
            modalForm:  <UnitForm/>
        });
        let {updateUnitModal} = this.actions;
        updateUnitModal({
            visible: true,
            title: '编辑计量单位',
            id: record.id,
            name: record.name
        });
    }

    render() {


        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <Button type="primary" onClick={this.handleAdd}>新增计量单位</Button>
                </h3>
                <div>
                    <div style={{width: '300px'}}>
                        <Table columns={this.columns}
                               dataSource={this.props.tableList}
                               loading={this.state.loading}
                               pagination={false}
                               bordered={true}/>
                    </div>
                </div>
                {this.state.modalForm}
            </div>
        )
    }
}

const mapStateToProps = reducers => ({
    tableList: reducers.UnitReducer.tableList
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
});
const Unit = connect(mapStateToProps, mapDispatchToProps)(UnitRdx);
export default Unit;
