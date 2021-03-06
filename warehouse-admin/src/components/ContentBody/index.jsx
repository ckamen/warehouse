import React from "react";

import {Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import Unit from "../../pages/Unit";
import Brand from "../../pages/Brand";
import Home from "../../pages/Home";
import Category from "../../pages/Category";
import Supplier from "../../pages/Merchant/supplier";
import Client from "../../pages/Merchant/client";
import User from "../../pages/User";
import Warehouse from "../../pages/Warehouse";
import Product from "../../pages/Product";
import WarehousingIn from "../../pages/Warehousing/in";
import WarehousingOut from "../../pages/Warehousing/out";
import WarehousingInHistory from "../../pages/Warehousing/History/in";
import WarehousingOutHistory from "../../pages/Warehousing/History/out";

const {Content} = Layout;

const ContentBody = ({match}) =>{
    return (
        <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ background: '#fff', padding: '0 1px', minHeight: 600 }}>
                <Switch>
                    <Route path={`${match.url}/unit`} component={Unit}/>
                    <Route path={`${match.url}/brand`} component={Brand}/>
                    <Route path={`${match.url}/category`} component={Category}/>
                    <Route path={`${match.url}/user`} component={User}/>
                    <Route path={`${match.url}/product`} component={Product}/>
                    <Route path={`${match.url}/warehouse`} component={Warehouse}/>
                    <Route path={`${match.url}/warehousing/in`} component={WarehousingIn}/>
                    <Route path={`${match.url}/warehousing/in-history`} component={WarehousingInHistory}/>
                    <Route path={`${match.url}/warehousing/out`} component={WarehousingOut}/>
                    <Route path={`${match.url}/warehousing/out-history`} component={WarehousingOutHistory}/>
                    <Route path={`${match.url}/merchant/client`} component={Client}/>
                    <Route path={`${match.url}/merchant/supplier`} component={Supplier}/>
                    <Route path={`${match.url}/`} component={Home}/>
                </Switch>
            </div>
        </Content>
    )
}

export default ContentBody;