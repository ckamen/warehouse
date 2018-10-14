import React from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
import './index.css';
import {Radio} from 'antd';
import axiosUtil from "../../utils/axiosUtil";
import {AJAX_SUCCESS, IN} from "../../utils/constants";

class PieChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            action: IN.toString()
        }
    }

    componentDidMount() {
        this.getPieChartData(IN);
    }

    getPieChartData(action) {
        let url = '/api/warehousing/findPieChartData?action=' + action;
        axiosUtil.get(url).then(result => {
            if (result.code === AJAX_SUCCESS) {
                if (result.data && result.data.length > 0) {
                    this.setState({
                        data: result.data
                    })
                }
            }
        });
    }

    handleChange = (e) => {
        this.setState({
            action: e.target.value
        });
        this.getPieChartData(e.target.value);
    }

    render() {
        const {DataView} = DataSet;
        const dv = new DataView();
        dv.source(this.state.data).transform({
            type: "percent",
            field: "count",
            dimension: "item",
            as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = Math.round(val * 10000) / 100 + "%";
                    return val;
                }
            }
        };
        return (
            <div>
                <div style={{marginTop: 20, marginLeft: 10}}>
                    <Radio.Group value={this.state.action} onChange={this.handleChange}>
                        <Radio.Button value="2">供应商</Radio.Button>
                        <Radio.Button value="1">变电站</Radio.Button>
                    </Radio.Group>
                </div>
                <Chart
                    height={500}
                    data={dv}
                    scale={cols}
                    padding={80}
                >
                    <Coord type="theta" radius={0.75}/>
                    <Axis name="percent"/>
                    <Legend
                        position="bottom"
                        offsetY={40}
                        offsetX={0}
                    />
                    <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color="item"
                        tooltip={[
                            "item*percent",
                            (item, percent) => {
                                percent = Math.round(percent * 10000) / 100 + "%";
                                return {
                                    name: item,
                                    value: percent
                                };
                            }
                        ]}
                        style={{
                            lineWidth: 1,
                            stroke: "#fff"
                        }}
                    >
                        <Label
                            content="percent"
                            formatter={(val, item) => {
                                return item.point.item + ": " + val;
                            }}
                        />
                    </Geom>
                </Chart>
            </div>
        );
    }
}

export default PieChart;
