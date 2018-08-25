import React from 'react';
import {Table, Icon, Divider, Button, Radio, Popconfirm} from 'antd';

import './index.css';
import utils from "../../utils/utils";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as actions from "../../redux/Category/categoryAction";
import CategoryForm from "../../components/CategoryForm";
import CategoryModel from "../../model/CategoryModel";

class CategoryRdx extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
        this.state = {
            loading: true
        }
        this.buildColumns();
    }

    componentDidMount() {
        let {getCategories} = this.actions;
        getCategories({...this.props.pagination, type: this.props.selectedType}).then(() => {
            this.setState({
                loading: false
            });
        });
    }

    buildColumns () {
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
            title: '类别名称',
            dataIndex: 'name',
            render: (value, record) => {
                return <span
                    style={{paddingLeft: record.level * 10}}>{record.level > 0 ? '|- ' + value : value}</span>;
            }
        }, {
            title: '类别编码',
            dataIndex: 'code'
        }];
    }
    handleAdd = () => {
        let {updateCategoryModal} = this.actions;
        updateCategoryModal({
            visible: true,
            ...CategoryModel
        });
    }

    handleDelete = (record) => {
        let {delCategory} = this.actions;
        delCategory(record.key);
    }

    handleEdit = (record) => {
        let {updateCategoryModal} = this.actions;
        updateCategoryModal({
            visible: true,
            id: record.id,
            name: record.name,
            code: record.code,
            level: record.parent ? record.parent.level : 0,
            parentId: record.parent ? record.parent.id + '' : null
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
        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <div>
                        <span style={{fontWeight: 'normal', fontSize: '14px'}}>类别：</span>
                        <Radio.Group value={this.props.selectedType} onChange={this.handleRadioChange}>
                            <Radio.Button value="1">供应商</Radio.Button>
                            <Radio.Button value="2">站点</Radio.Button>
                            <Radio.Button value="3">商品</Radio.Button>
                        </Radio.Group>
                    </div>
                    <Button type="primary" onClick={this.handleAdd}>新增</Button>
                </h3>
                <div>
                    <div style={{width: '400px'}}>
                        <Table columns={this.columns}
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