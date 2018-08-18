import axios from 'axios';
import * as Qs from "qs";
import {message} from "antd";

const axiosUtil = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: data => (
        Qs.stringify(data, {arrayFormat: 'brackets'})
    )
});

axiosUtil.interceptors.response.use(function (response) {
    let {status} = response;
    if (status === 200) {
        if (response.data.code > 0) {
            message.warn(response.data.message);
        }
        return response.data.data;
    } else {
        message.error('请求遇到服务器错误');
        console.error(response);
    }
    return response;
}, function (error) {
    message.error('请求遇到网络错误：' + error.message);
    return Promise.reject(error);
});

export default axiosUtil