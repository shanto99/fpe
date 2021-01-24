import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Authentication from "./API/Authentication";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={() => (
            Authentication.isAuthenticated()
                ? <Component {...rest}/>
                : <Redirect to="/login"/>
        )}/>
    )
}

export default PrivateRoute;