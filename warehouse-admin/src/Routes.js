import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import React from "react";
import App from "./App";
import AuthRoute from "./components/AuthRoute";

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login}/>
                <AuthRoute path='/home' component={App} />
                <Redirect to="/" />
            </Switch>
        );
    }
}


export default Routes;