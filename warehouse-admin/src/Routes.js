import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import React from "react";

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login}/>
                <Redirect to="/" />
            </Switch>
        );
    }
}


export default Routes;