import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AfterLoginRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} render = { 
        props => (
        localStorage.getItem('company') && localStorage.getItem('user')
            ? <Redirect to={{ pathname: '/admin', state: { from: props.location } }} />
            : <Component {...props} />
        )} 
    />
)