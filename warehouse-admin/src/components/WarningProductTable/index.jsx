import React from "react";
import {Anchor, Badge, Table} from "antd";
import './index.css';
import axiosUtil from "../../utils/axiosUtil";
import {AJAX_SUCCESS} from "../../utils/constants";
import {Link} from "react-router-dom";

class WarningProductTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableList: [],
            loading: true,
            showMoreBtn: false
        }
        this.buildColumns();

    }

    componentDidMount() {
        this.loadData(5);
    }

    loadData(pageSize) {
        let url = '/api/product/find-warning?pageSize='+pageSize;
        axiosUtil.get(url).then(result => {
            let tableList = [];
            let showMoreBtn = false;
            if (result.code === AJAX_SUCCESS) {
                if (result.data) {
                    tableList = result.data.records;
                    showMoreBtn = result.data.pages > 1;
                }
            }
            this.setState({
                tableList: tableList,
                loading: false,
                showMoreBtn: showMoreBtn
            });
        });
    }

    buildColumns() {
        this.columns = [{
            title: '商品编码',
            dataIndex: 'code'
        },{
            title: '规格型号',
            dataIndex: 'specification'
        },{
            title: '供应商',
            dataIndex: 'supplierName'
        },{
            title: '类别',
            dataIndex: 'categoryName'
        }, {
            title: '库存下限',
            dataIndex: 'minInventory',
            render: (value, record) => {
                let oValue = value >= 0 ? value : '';
                if (record.inventory <= value) {
                    return <Badge count={oValue} style={{ backgroundColor: '#ffd51b' }}/>;
                } else {
                    return oValue;
                }
            }
        }, {
            title: '当前库存',
            dataIndex: 'inventory'
        }, {
            title: '库存上限',
            dataIndex: 'maxInventory',
            render: (value, record) => {
                let oValue = value >= 0 ? value : '';
                if (record.inventory >= value) {
                    return <Badge count={oValue} style={{ backgroundColor: '#ffd51b' }}/>;
                } else {
                    return oValue;
                }
            }
        }];
    }

    moreHandle = () => {
        this.loadData(100);
    }

    render() {
        return (
            <div>
                <div>
                    <h3>库存预警</h3>
                </div>
                <Table columns={this.columns}
                       dataSource={this.state.tableList}
                       pagination={false}
                       loading={this.state.loading}
                       bordered={true}/>
                <div style={{float: "right", padding: 5, display: this.state.showMoreBtn ? "block": "none"}}>
                    <a href="javascript:void(0);" onClick={this.moreHandle}>更多>></a>
                </div>
            </div>
        )
    }
}

export default WarningProductTable;
