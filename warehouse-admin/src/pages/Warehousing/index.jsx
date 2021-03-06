import React from 'react';
import {Button, DatePicker, Form, message} from 'antd';

import './index.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/Warehousing/warehousingAction";
import WarehousingTable from "../../components/WarehousingTable";
import moment from "moment";
import {CLIENT, DATE_FORMAT, DEFAULT_CURRENT, DEFAULT_PAGE_SIZE, MAX_SIZE, OUT} from "../../utils/constants";
import {getProducts} from "../../redux/Product/productAction";
import {ISelect} from "../../components/Commons";
import {getMerchants} from "../../redux/Merchant/merchantAction";

class WarehousingRdx extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
        this.whAction = this.props.whAction;
    }

    componentDidMount() {
        let {resetWarehousing} = this.actions;
        resetWarehousing({action: this.whAction});

        if (this.whAction === OUT) {
            let {getMerchants} = this.actions;
            getMerchants({pageSize: MAX_SIZE, type: CLIENT});
        }
    }

    handleSave = () => {
        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let records = this.props.tableList;
            if (records.length > 0) {
                let {clientId, receiptDate} = values;
                let isValidProductId = false;
                for (let record of records) {
                    record.receiptDate = receiptDate.format(DATE_FORMAT);
                    if (this.whAction === OUT) {
                        record.merchantId = clientId;
                    }
                    if(record.productId && record.productId > 0) {
                        isValidProductId = true;
                    }
                }
                if(isValidProductId) {
                    let {saveBatchWarehousing, getProducts} = this.actions;
                    saveBatchWarehousing(records).then(() => {
                        getProducts({current: DEFAULT_CURRENT, pageSize: DEFAULT_PAGE_SIZE})
                    });
                } else {
                    message.error('请至少选择一种商品');
                }
            }
        });
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <div>
                        <Form layout={'inline'}>
                            {
                                this.whAction === OUT ? (
                                    <Form.Item label="使用站点">
                                        {getFieldDecorator('clientId', {
                                            rules: [{required: true, message: '请选择使用站点'}],
                                        })(
                                            <ISelect data={this.props.clients} style={{width: 160}}/>
                                        )}
                                    </Form.Item>
                                ) : null
                            }
                            <Form.Item label="单据日期">
                                {getFieldDecorator('receiptDate', {
                                    initialValue: moment(),
                                    rules: [{required: true, message: '请输入单据日期'}],
                                })(
                                    <DatePicker format={DATE_FORMAT} allowClear={false} />
                                )}
                            </Form.Item>
                        </Form>
                    </div>
                    <Button type="primary" onClick={this.handleSave}>保存</Button>
                </h3>
                <div>
                    <WarehousingTable whAction={this.whAction}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reducers => ({
    tableList: reducers.WarehousingReducer.tableList,
    pagination: reducers.WarehousingReducer.pagination,
    clients: reducers.MerchantReducer.tableList
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions, getProducts, getMerchants}, dispatch)
});
const Warehousing = connect(mapStateToProps, mapDispatchToProps)(WarehousingRdx);
export default Form.create()(Warehousing);
;
