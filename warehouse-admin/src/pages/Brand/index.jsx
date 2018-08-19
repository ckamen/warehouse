import React from 'react';
import {Table, Icon, Divider, Button, Switch} from 'antd';

import './index.css';
import utils from "../../utils/utils";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {delBrand, getBrands, saveBrand, updateBrandModal} from "../../redux/actions/brandAction";
import BrandForm from "../../components/BrandForm";

class BrandRdx extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.props.actions.getBrands(this.props.pagination).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    handleAdd = () => {
        this.props.actions.updateBrandModal({
            visible: true,
            id: -1,
            name: '',
            code: ''
        });
    }

    handleDelete = (record) => {
        let that = this;

        utils.showConfirm({
            title: '删除确认',
            content: '确认要删除该品牌吗？',
            onOk() {
                return new Promise(resolve => {
                    that.props.actions.delBrand(record.key).then(() => resolve());
                })
            }
        });

    }

    handleEdit = (record) => {
        this.props.actions.updateBrandModal({
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
        this.props.actions.getBrands(pager).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    handleActiveChange = (checked, record) => {
        console.log('handleActiveChange', checked, record);
        this.props.actions.saveBrand({
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

        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <Button type="primary" onClick={this.handleAdd}>新增品牌</Button>
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
                <BrandForm/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tableList: state.BrandReducer.tableList,
    pagination: state.BrandReducer.pagination
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({getBrands, delBrand, updateBrandModal, saveBrand}, dispatch)
});
const Brand = connect(mapStateToProps, mapDispatchToProps)(BrandRdx);
export default Brand;