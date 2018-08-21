import React from 'react';
import {Table, Icon, Divider, Button} from 'antd';

import './index.css';
import utils from "../../utils/utils";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {delUnit, getUnits, updateUnitModal} from "../../redux/actions/unitAction";
import UnitForm from "../../components/UnitForm";

class UnitRdx extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        this.buildColumns();
    }

    componentDidMount() {
        this.props.actions.getUnits().then(() => {
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
                    <a href="javascript:void(0);" title={'删除'} onClick={() => this.handleDelete(record)}><Icon
                        type={'delete'}/></a>
                </span>
            ),
        }, {
            title: '名称',
            dataIndex: 'name'
        }];
    }

    handleAdd = () => {
        this.props.actions.updateUnitModal({
            visible: true,
            title: '创建计量单位',
            id: -1,
            name: ''
        });
    }

    handleDelete = (record) => {
        let that = this;

        utils.showConfirm({
            title: '删除确认',
            content: '确认要删除该计量单位吗？',
            onOk() {
                return new Promise(resolve => {
                    that.props.actions.delUnit(record.key).then(() => resolve());
                })
            }
        });
    }

    handleEdit = (record) => {
        this.props.actions.updateUnitModal({
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
                <UnitForm/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tableList: state.UnitReducer.tableList
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({getUnits, delUnit, updateUnitModal}, dispatch)
});
const Unit = connect(mapStateToProps, mapDispatchToProps)(UnitRdx);
export default Unit;