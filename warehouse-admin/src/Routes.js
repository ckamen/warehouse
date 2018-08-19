import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import React from "react";
import App from "./App";
import AuthRoute from "./components/AuthRoute";

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/login' component={Login}/>
                <AuthRoute path='/home' component={App} />
                <Redirect to="/home" />
            </Switch>
        );
    }
}


export default Routes;