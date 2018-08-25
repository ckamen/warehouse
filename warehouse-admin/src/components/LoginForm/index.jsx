import React from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import './index.css';
import {login} from "../../redux/Login/loginAction";
import {AJAX_SUCCESS} from "../../utils/constants";
import {Redirect} from "react-router-dom";


class LoginFormRdx extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
        }
        this.actions = props.actions;
    }

    // 加载组件前
    componentWillMount() {
    }

    // submit 事件
    loginInSubmit = (e) => {
        let event = e || window.event;
        event.preventDefault();
        let that = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {username, password} = values;
                this.actions.login({username, password})
                    .then(result => {
                        if (result.code === AJAX_SUCCESS) {
                            that.setState({
                                isAuth: true
                            });
                        }
                    })
            } else {
                // 验证不过
                return false;
            }
        });
    }

    render() {

        if (this.state.isAuth) {
            return <Redirect to={{pathname: '/home'}}/>
        }

        const {getFieldDecorator} = this.props.form;
        const FormItem = Form.Item;
        return (
            <div className="loginform-div">
                <div className="loginform-title">
                    <span>库存管理系统</span>
                </div>
                <Form
                    onSubmit={this.loginInSubmit.bind(this)}
                >
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: '请输入用户名!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入密码!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="loginform__login-btn"
                        >
                            登 陆
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}


LoginFormRdx.propTypes = {
    actions: PropTypes.shape({
        login: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = state => ({
    loginUser: state.LoginReducer.loginUser
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({login}, dispatch),
});


const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormRdx);
export default Form.create()(LoginForm);
