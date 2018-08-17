import React from "react";
import {Redirect, Route} from "react-router-dom";

const AuthRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => <Component {...props} />
        }
    />
);

export default AuthRoute;