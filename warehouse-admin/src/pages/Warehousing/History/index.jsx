import React from 'react';
import {Table, Icon, Divider, Button, Popconfirm, Form, Input, DatePicker} from 'antd';

import './index.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getWarehousings} from "../../../redux/Warehousing/warehousingAction";
import {DATE_FORMAT, OUT} from "../../../utils/constants";

const RangePicker = DatePicker.RangePicker;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

class WarehousingHistoryRdx extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
        this.whAction = this.props.whAction;
        this.state = {
            loading: true
        }
        this.buildColumns();
    }

    componentDidMount() {
        let {getWarehousings} = this.actions;
        getWarehousings({...this.props.pagination, 'action': this.whAction}).then(() => {
            this.setState({
                loading: false
            })
        });
    }

    buildColumns() {
        this.columns = [{
            title: '单据日期',
            dataIndex: 'receiptDate',
            render: (value) => {
                if (value) {
                    return value.substr(0, 10)
                }
                return value;
            }
        }, {
            title: '商品编码',
            dataIndex: 'productCode'
        }, {
            title: this.whAction === OUT ? '使用站点' : '供应商',
            dataIndex: 'merchantName'
        }, {
            title: '数量',
            dataIndex: 'quantity'
        }, {
            title: '制单人',
            dataIndex: 'createdByName'
        }, {
            title: '制单时间',
            dataIndex: 'createdTime'
        }, {
            title: '备注',
            dataIndex: 'remark'
        }];
    }

    handleSearch = () => {
        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let receiptStartDate, receiptEndDate;
            if (values.receiptRange && values.receiptRange.length > 1) {
                receiptStartDate = values.receiptRange[0].format(DATE_FORMAT);
                receiptEndDate = values.receiptRange[1].format(DATE_FORMAT);
            }
            let pager = {
                ...this.props.pagination,
                action: this.whAction,
                ...values,
                receiptStartDate,
                receiptEndDate
            };
            console.log(pager);
            let {getWarehousings} = this.actions;
            getWarehousings(pager).then(() => {
                this.setState({
                    loading: false
                })
            });
        });
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <div>
                        <Form layout={'inline'}>
                            <Form.Item label={this.whAction === OUT ? "使用站点" : "供应商"}  {...formItemLayout}>
                                {getFieldDecorator('merchantName', {
                                    rules: [{max: 30, message: '输入长度不能超过30个字符'}]
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                            <Form.Item label="商品编码"  {...formItemLayout}>
                                {getFieldDecorator('productCode', {
                                    rules: [{max: 30, message: '输入长度不能超过30个字符'}]
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                            <Form.Item label="单据日期" {...formItemLayout}>
                                {getFieldDecorator('receiptRange',
                                    {
                                        rules: [{type: 'array'}],
                                    })
                                (
                                    <RangePicker/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type={'search'} onClick={this.handleSearch}>查询</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </h3>
                <div>
                    <div>
                        <Table columns={this.columns}
                               dataSource={this.props.tableList}
                               loading={this.state.loading}
                               pagination={this.state.pagination}
                               bordered={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tableList: state.WarehousingReducer.tableList,
    pagination: state.WarehousingReducer.pagination
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({getWarehousings}, dispatch)
});
const WarehousingHistory = connect(mapStateToProps, mapDispatchToProps)(WarehousingHistoryRdx);
export default Form.create()(WarehousingHistory);