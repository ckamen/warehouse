import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from './redux/store';
import Routes from "./Routes";

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
