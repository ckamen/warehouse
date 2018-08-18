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
    }

    componentDidMount() {
        this.props.actions.getUnits().then(() => {
            this.setState({
                loading: false
            })
        });
    }

    handleAdd = () => {
        this.props.actions.updateUnitModal({
            visible: true,
            id: -1,
            name: ''
        });
    }

    handleDelete = (record) => {
        let that = this;

        utils.showConfirm({
            title: '确认删除',
            content: '确认要删除计量单位吗？',
            onOk() {
                return new Promise((resolve, reject) => {
                    that.props.actions.delUnit(record.key).then(() => resolve());

                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {
            }
        });

    }

    handleEdit = (record) => {
        this.props.actions.updateUnitModal({
            visible: true,
            id: record.id,
            name: record.name
        });
    }

    render() {
        const columns = [{
            title: '操作',
            key: 'action',
            align: 'center',
            width: '100px',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" title={'编辑'} onClick={() => this.handleEdit(record)}><Icon
                        type={'edit'}/></a>
                    <Divider type="vertical"/>
                    <a href="javascript:;" title={'删除'} onClick={() => this.handleDelete(record)}><Icon
                        type={'delete'}/></a>
                </span>
            ),
        }, {
            title: '名称',
            dataIndex: 'name'
        }];

        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <Button type="primary" onClick={this.handleAdd}>新增计量单位</Button>
                </h3>
                <div>
                    <div style={{width: '300px'}}>
                        <Table columns={columns}
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