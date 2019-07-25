import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const hasAccess = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return false;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
        sessionStorage.removeItem('token');
        return false;
    }
    return true;
}


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        hasAccess()
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)


export default PrivateRoute;