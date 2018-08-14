import React from 'react';
import { Layout, Row, Col } from 'antd';

import './index.css';
import LoginForm from "../../components/LoginForm";

const Login = () => (
    <Layout className="loginpage-container">
        <Row className="login-row">
            <Col span={6} offset={9} className="login-col">
                <div className="loginForm-div">
                    <LoginForm/>
                </div>
            </Col>
        </Row>
    </Layout>

);

export default Login;