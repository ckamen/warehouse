import React from "react";

import {Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import Unit from "../../pages/unit";
import Brand from "../../pages/brand";
import Home from "../../pages/Home";

const {Content} = Layout;

const ContentBody = ({match}) =>{
    return (
        <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ background: '#fff', minHeight: 600 }}>
                <Switch>
                    <Route path={`${match.url}/unit`} component={Unit}/>
                    <Route path={`${match.url}/brand`} component={Brand}/>
                    <Route path={`${match.url}/`} component={Home}/>
                </Switch>
            </div>
        </Content>
    )
}

export default ContentBody;