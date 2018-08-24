import React from 'react';
import {Table, Icon, Divider, Button, Switch, Popconfirm, DatePicker} from 'antd';

import './index.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions/warehousingAction";
import WarehousingTable from "../../components/WarehousingTable";
import moment from "moment";
import {DATE_FORMAT} from "../../utils/constants";

class WarehousingRdx extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
    }

    componentDidMount() {

    }

    handleSave = () => {

    }

    render() {
        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <div>
                        <span style={{fontWeight: 'normal', fontSize: '14px'}}>单据日期：</span>
                        <DatePicker defaultValue={moment()} format={DATE_FORMAT} allowClear={false}/>
                    </div>
                    <Button type="primary" onClick={this.handleSave}>保存</Button>
                </h3>
                <div>
                   <WarehousingTable/>
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
    actions: bindActionCreators({...actions}, dispatch)
});
const Warehousing = connect(mapStateToProps, mapDispatchToProps)(WarehousingRdx);
export default Warehousing;