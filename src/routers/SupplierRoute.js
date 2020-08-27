import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const SupplierRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render = { 
        props => (
        localStorage.getItem('supplier')
                ? <Component {...props} /> 
            : <Redirect to={{ pathname: 'proveedor', state: { from: props.location } }} />
        )} 
    />
)