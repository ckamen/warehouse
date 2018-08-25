import React from "react";
import {Redirect, Route} from "react-router-dom";

class AuthRoute extends React.Component {

    componentDidMount() {
    }

    render() {
        const {component: Component, ...rest} = this.props;
        let token = sessionStorage.getItem('token');
        let isAuth = token != null && token !== '';
        return <Route
            {...rest}
            render={props => isAuth ?
                (<Component {...props} />)
                :
                (<Redirect
                    to={{pathname: '/', state: {from: props.location}}}
                />)
            }
        />
    }
}

export default AuthRoute;