import React from 'react';
import {Table, Icon, Divider, Button, Radio} from 'antd';

import './index.css';
import utils from "../../utils/utils";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as actions from "../../redux/actions/categoryAction";
import CategoryForm from "../../components/CategoryForm";

class CategoryRdx extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        let {getCategories} = this.actions;
        getCategories({...this.props.pagination, type: this.props.selectedType}).then(() => {
            this.setState({
                loading: false
            });
        });
    }

    handleAdd = () => {
        let {updateCategoryModal} = this.actions;
        updateCategoryModal({
            visible: true,
            id: -1,
            name: '',
            level: 0,
            parentId: undefined
        });
    }

    handleDelete = (record) => {
        let {delCategory} = this.actions;
        utils.showConfirm({
            title: '删除确认',
            content: '确认要删除该类别吗？',
            onOk() {
                return new Promise(resolve => {
                    delCategory(record.key).then(() => resolve());
                })
            }
        });

    }

    handleEdit = (record) => {
        let {updateCategoryModal} = this.actions;
        updateCategoryModal({
            visible: true,
            id: record.id,
            name: record.name,
            level: record.parent ? record.parent.level : 0,
            parentId: record.parent ? record.parent.id + '' : undefined
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        let pager = {...this.props.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        let {getCategories} = this.actions;
        getCategories(pager).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    handleRadioChange = (e) => {
        console.log('handleRadioChange', e);
        let {getCategories, updateCategoryType} = this.actions;
        updateCategoryType(e.target.value);
        getCategories({...this.props.pagination, type: e.target.value});
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
            title: '类别',
            dataIndex: 'name',
            render: (value, record) => {
                return <span
                    style={{paddingLeft: `${record.level * 10}px`}}>{record.level > 0 ? '|- ' + value : value}</span>;
            }
        }];

        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <div>
                        <span style={{fontWeight: 'normal', fontSize: '14px'}}>类别：</span>
                        <Radio.Group value={this.props.selectedType} onChange={this.handleRadioChange}>
                            <Radio.Button value="1">供应商</Radio.Button>
                            <Radio.Button value="2">客户</Radio.Button>
                            <Radio.Button value="3">商品</Radio.Button>
                        </Radio.Group>
                    </div>
                    <Button type="primary" onClick={this.handleAdd}>新增</Button>
                </h3>
                <div>
                    <div style={{width: '400px'}}>
                        <Table columns={columns}
                               dataSource={this.props.tableList}
                               pagination={this.props.pagination}
                               loading={this.state.loading}
                               onChange={this.handleTableChange}
                               bordered={true}/>
                    </div>
                </div>
                <CategoryForm/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tableList: state.CategoryReducer.tableList,
    pagination: state.CategoryReducer.pagination,
    selectedType: state.CategoryReducer.selectedType
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
});
const Category = connect(mapStateToProps, mapDispatchToProps)(CategoryRdx);
export default Category;