import React from "react";
import {Badge, Table} from "antd";
import './index.css';
import axiosUtil from "../../utils/axiosUtil";
import {AJAX_SUCCESS} from "../../utils/constants";

class WarehousingInfoTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableList: [],
            loading: true
        }
        this.buildColumns();

    }

    componentDidMount() {
        let url = '/api/warehousing/page?pageSize=5';
        axiosUtil.get(url).then(result => {
            let tableList = [];
            if (result.code === AJAX_SUCCESS) {
                if (result.data) {
                    tableList = result.data.records;
                }
            }
            this.setState({
                tableList: tableList,
                loading: false
            });
        });
    }

    buildColumns() {
        this.columns = [{
            title: '商品编码',
            dataIndex: 'productCode'
        }, {
            title: '动作',
            dataIndex: 'action',
            render: value => value === 1 ? '出库': '入库'
        }, {
            title: '数量',
            dataIndex: 'quantity'
        }, {
            title: '创建时间',
            dataIndex: 'createdTime'
        }];
    }

    render() {
        return (
            <div>
                <div>
                    <h3>最近出库/入库单</h3>
                </div>
                <Table columns={this.columns}
                       dataSource={this.state.tableList}
                       pagination={false}
                       loading={this.state.loading}
                       bordered={true}/>
            </div>
        )
    }
}

export default WarehousingInfoTable;
