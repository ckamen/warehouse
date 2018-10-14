import React from 'react';

import './index.css';
import PieChart from "../../components/PieChart";
import {Col, Divider, Row} from "antd";
import WarningProductTable from "../../components/WarningProductTable";
import WarehousingInfoTable from "../../components/WarehousingInfoTable";

const Home = () => (
    <Row>
        <Col span={12} className={'c_left'}>
            <PieChart/>
        </Col>
        <Col span={12}>
            <div style={{padding: 10}}>
                <WarningProductTable/>
            </div>
            <Divider type="horizontal" />
            <div style={{padding: 10}}>
                <WarehousingInfoTable/>
            </div>
        </Col>
    </Row>

);

export default Home;