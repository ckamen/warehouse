import React from "react";
import {Layout, Icon, Avatar} from 'antd';

import './index.css';
import {showConfirm} from "../../utils/utils";
import {withRouter} from "react-router-dom";
import logo from "../../assets/logo.png";

const {Header} = Layout;

class ContentHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    logout = () => {
        const that = this;
        showConfirm({
            title: '确认退出库存管理系统吗?',
            onOk() {
                sessionStorage.clear();
                that.props.history.push("/");
            }
        })
    }

    render() {
        let username = sessionStorage.getItem('username');
        return (
            <Header className="header-div">
                <div style={{float: 'left'}}>
                    <Icon
                        className="trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.toggle}
                    />
                    <img alt="logo" src={logo} width={60} height={50}/>
                </div>
                <div className="userprofile-div">
                    <div className="userprofile-content">
                        <div>
                            <Avatar icon="user"/>
                        </div>
                        <div className="userprofile-username">{username}</div>
                        <div className="userprofile-signout">
                            <a onClick={this.logout}>注销</a>
                        </div>
                    </div>
                </div>
            </Header>
        );
    }
}

export default withRouter(ContentHeader);