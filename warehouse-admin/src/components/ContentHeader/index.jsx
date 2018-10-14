import React from "react";
import {Layout, Icon, Avatar, Input} from 'antd';

import './index.css';
import {showConfirm} from "../../utils/utils";
import {withRouter} from "react-router-dom";
import logo from "../../assets/logo.png";
import {connect} from "react-redux";
import {getProducts, updateGlobalQuery} from "../../redux/Product/productAction";
import {bindActionCreators} from "redux";
import {updateSelectedKey} from "../../redux/Menu/menuAction";

const {Header} = Layout;
const {Search} = Input;

class ContentHeader extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
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

    handleSearch = (value) => {
        console.log(value);
        let {updateGlobalQuery, getProducts, updateSelectedKey} = this.actions;
        updateGlobalQuery(value);
        updateSelectedKey('product');
        getProducts({...this.props.pagination, queryValue: value}).then(() => {

        });
        this.props.history.push("/home/product");

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
                    <div>
                        <Search
                            placeholder="搜索商品"
                            onSearch={this.handleSearch}
                            style={{width: 200, marginRight: 20}}
                        />
                    </div>
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

const mapStateToProps = state => ({
    pagination: state.ProductReducer.pagination
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({updateGlobalQuery, getProducts, updateSelectedKey}, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContentHeader));
