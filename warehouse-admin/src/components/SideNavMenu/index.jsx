import React from "react";
import {Icon, Menu, Layout} from "antd";
import {NavLink} from "react-router-dom";
import './index.css';

const {Sider} = Layout;
const {SubMenu} = Menu;

class SideNavMenu extends React.Component {
    constructor(props) {
        super(props);
        let activeMenu = sessionStorage.getItem('ACTIVE_MENU');
        if (activeMenu) {
            let keyPath = activeMenu.split('|');
            if (keyPath.length > 1) {
                this.state = {
                    selectedKey: keyPath[0],
                    openKey: keyPath.slice(1, keyPath.length)
                };
            } else {
                this.state = {
                    selectedKey: keyPath[0],
                    openKey: []
                };
            }
        } else {
            this.state = {
                selectedKey: 'home',
                openKey: []
            };
        }
    }

    handleClick = ({key, keyPath}) => {
        sessionStorage.setItem('ACTIVE_MENU', keyPath.join('|'));
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
                <Menu theme="dark" mode="inline" defaultOpenKeys={this.state.openKey}
                      defaultSelectedKeys={[this.state.selectedKey]}
                      onClick={this.handleClick}>
                    <Menu.Item key="home">
                        <NavLink to="/home/"><Icon type="home"/><span>首页</span></NavLink>
                    </Menu.Item>
                    <SubMenu
                        key="materials"
                        title={<span><Icon type="user"/><span>资料</span></span>}
                    >
                        <Menu.Item key="unit"><NavLink to="/home/unit">计量单位</NavLink></Menu.Item>
                        <Menu.Item key="brand"><NavLink to="/home/brand">品牌管理</NavLink></Menu.Item>
                        <Menu.Item key="category"><NavLink to="/home/category">类别管理</NavLink></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default SideNavMenu;