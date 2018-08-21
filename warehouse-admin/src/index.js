import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from './redux/store';
import Routes from "./Routes";
import zhCN from "antd/lib/locale-provider/zh_CN";
import {LocaleProvider} from "antd";

ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </Provider>
    </LocaleProvider>
    , document.getElementById('root'));
registerServiceWorker();
