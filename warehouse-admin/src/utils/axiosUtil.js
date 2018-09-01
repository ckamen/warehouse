import axios from 'axios';
import * as Qs from "qs";
import {message} from "antd";

const axiosUtil = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: data => Qs.stringify(data, {allowDots: true})
});

axiosUtil.interceptors.request.use(function (config) {
    config.headers.common['x-access-token'] = sessionStorage.getItem('token');
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosUtil.interceptors.response.use(function (response) {
    let {status} = response;
    if (status === 200) {
        if (response.data.code > 0) {
            message.warn(response.data.message);
        }
        return response.data;
    } else {
        message.error('请求遇到服务器错误');
        console.error(response);
    }
    return response;
}, function (error) {
    if (error.response.status === 403) {
        message.warn('登录会话已经失效，请重新登录');
        sessionStorage.clear();
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
    } else {
        message.error('请求遇到网络错误：' + error.message);
    }
    return Promise.reject(error);
});

export default axiosUtil