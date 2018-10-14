import React from "react";
import {Icon, Menu, Layout} from "antd";
import {NavLink} from "react-router-dom";
import './index.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {updateSelectedKey} from "../../redux/Menu/menuAction";

const {Sider} = Layout;
const {SubMenu} = Menu;

class SideNavMenu extends React.Component {
    constructor(props) {
        super(props);
        this.actions  = this.props.actions;
        let {updateSelectedKey} = this.actions;

        let activeMenu = sessionStorage.getItem('ACTIVE_MENU');
        if (activeMenu) {
            let keyPath = activeMenu.split('|');
            updateSelectedKey(keyPath[0]);
            if (keyPath.length > 1) {
                this.state = {
                    openKey: keyPath.slice(1, keyPath.length)
                };
            } else {
                this.state = {
                    openKey: []
                };
            }
        } else {
            this.state = {
                openKey: []
            };
        }
    }

    handleClick = ({key, keyPath}) => {
        sessionStorage.setItem('ACTIVE_MENU', keyPath.join('|'));
        let {updateSelectedKey} = this.actions;
        updateSelectedKey(key);
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
                      defaultSelectedKeys={[this.props.selectedKey]} selectedKeys={[this.props.selectedKey]}
                      onClick={this.handleClick}>
                    <Menu.Item key="home">
                        <NavLink to="/home/"><Icon type="home"/><span>首页</span></NavLink>
                    </Menu.Item>
                    <SubMenu
                        key="warehouseIn"
                        title={<span><Icon type="calculator"/><span>入库管理</span></span>}
                    >
                        <Menu.Item key="in"><NavLink to="/home/warehousing/in">入库单</NavLink></Menu.Item>
                        <Menu.Item key="inHistory"><NavLink to="/home/warehousing/in-history">入库记录</NavLink></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="warehouseOut"
                        title={<span><Icon type="switcher"/><span>出库管理</span></span>}
                    >
                        <Menu.Item key="out"><NavLink to="/home/warehousing/out">出库单</NavLink></Menu.Item>
                        <Menu.Item key="outHistory"><NavLink to="/home/warehousing/out-history">出库记录</NavLink></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="product">
                        <NavLink to="/home/product"><Icon type="tool"/><span>商品管理</span></NavLink>
                    </Menu.Item>
                    <Menu.Item key="warehouse">
                        <NavLink to="/home/warehouse"><Icon type="database"/><span>仓库管理</span></NavLink>
                    </Menu.Item>
                    <SubMenu
                        key="materials"
                        title={<span><Icon type="setting"/><span>基本设置</span></span>}
                    >
                        <Menu.Item key="unit"><NavLink to="/home/unit">计量单位</NavLink></Menu.Item>
                        <Menu.Item key="brand"><NavLink to="/home/brand">品牌管理</NavLink></Menu.Item>
                        <Menu.Item key="category"><NavLink to="/home/category">类别管理</NavLink></Menu.Item>
                        <Menu.Item key="supplier"><NavLink to="/home/merchant/supplier">供应商管理</NavLink></Menu.Item>
                        <Menu.Item key="client"><NavLink to="/home/merchant/client">站点管理</NavLink></Menu.Item>
                        <Menu.Item key="user"><NavLink to="/home/user">用户管理</NavLink></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

const mapStateToProps = state => ({
    selectedKey: state.MenuReducer.selectedKey
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({updateSelectedKey}, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(SideNavMenu);
