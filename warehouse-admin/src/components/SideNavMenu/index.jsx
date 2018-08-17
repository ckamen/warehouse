import React from "react";
import {Icon, Menu, Layout} from "antd";
import {NavLink} from "react-router-dom";
import './index.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideNavMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
            >
                <div className="logo">
                   库存管理系统
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']} >
                    <Menu.Item key="home">
                        <NavLink to="/home/"><Icon type="home" /><span>首页</span></NavLink>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="user"/><span>资料</span></span>}
                    >
                        <Menu.Item key="unit"><NavLink to="/home/unit">计量单位</NavLink></Menu.Item>
                        <Menu.Item key="brand"><NavLink to="/home/brand">品牌管理</NavLink></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default SideNavMenu;