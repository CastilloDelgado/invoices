import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render = { 
        props => (
        localStorage.getItem('user')
            ? localStorage.getItem('company') 
                ? <Component {...props} /> : <Redirect to={{ pathname: '/empresa', state: { from: props.location } }}/>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} 
    />
)