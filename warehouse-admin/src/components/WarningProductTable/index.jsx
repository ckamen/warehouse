import React from "react";
import {Badge, Table} from "antd";
import './index.css';
import axiosUtil from "../../utils/axiosUtil";
import {AJAX_SUCCESS} from "../../utils/constants";

class WarningProductTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableList: [],
            loading: true
        }
        this.buildColumns();

    }

    componentDidMount() {
        let url = '/api/product/find-warning';
        axiosUtil.get(url).then(result => {
            let tableList = [];
            if (result.code === AJAX_SUCCESS) {
                if (result.data && result.data.length > 0) {
                    tableList = result.data;
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
            dataIndex: 'code'
        }, {
            title: '库存下限',
            dataIndex: 'minInventory',
            render: (value, record) => {
                let oValue = value >= 0 ? value : ''
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
            </div>
        )
    }
}

export default WarningProductTable;
