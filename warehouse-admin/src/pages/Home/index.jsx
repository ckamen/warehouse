import React from 'react';

import './index.css';
import PieChart from "../../components/PieChart";
import {Col, Row} from "antd";

const Home = () => (
    <Row>
        <Col span={12}>
            <PieChart/>
        </Col>
        <Col span={12}></Col>
    </Row>

);

export default Home;