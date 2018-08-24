import React from 'react';
import {Table, Icon, Divider, Button, Switch, Popconfirm, DatePicker} from 'antd';

import './index.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/Warehousing/warehousingAction";
import WarehousingTable from "../../components/WarehousingTable";
import moment from "moment";
import {DATE_FORMAT, DEFAULT_CURRENT, DEFAULT_PAGE_SIZE} from "../../utils/constants";
import {getProducts} from "../../redux/actions/productAction";

class WarehousingRdx extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
        this.whAction = this.props.whAction;
        this.receiptDate = moment().format(DATE_FORMAT);
    }

    componentDidMount() {
        let {resetWarehousing} = this.actions;
        resetWarehousing();
    }

    handleSave = () => {
        let records = this.props.tableList;
        if (records.length > 0) {
            for (let record of records) {
                record.action = this.whAction;
                record.receiptDate = this.receiptDate;
            }
            let {saveBatchWarehousing, getProducts} = this.actions;
            saveBatchWarehousing(records).then(() => {
                getProducts({current: DEFAULT_CURRENT, pageSize: DEFAULT_PAGE_SIZE})
            });
        }
    }

    handleDateChange = (date, dateStr) => {
        console.log('handleDateChange', date, dateStr);
        this.receiptDate = dateStr;
        console.log(this.receiptDate);
    }

    render() {
        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <div>
                        <span style={{fontWeight: 'normal', fontSize: '14px'}}>单据日期：</span>
                        <DatePicker defaultValue={moment()} format={DATE_FORMAT} allowClear={false}
                                    onChange={this.handleDateChange}/>
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

const mapStateToProps = state => ({
    tableList: state.WarehousingReducer.tableList,
    pagination: state.WarehousingReducer.pagination
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions, getProducts}, dispatch)
});
const Warehousing = connect(mapStateToProps, mapDispatchToProps)(WarehousingRdx);
export default Warehousing;