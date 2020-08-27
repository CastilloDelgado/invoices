import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, Responsive } from 'semantic-ui-react'

import { LayoutSupplier } from '../modules/_custom';

import {components} from './components'

const SupplierMainRouter = ({match, json}) => {

    const getModule = () => {
        return json.modules.find((item) => {
            return item.render === "SupplierMainRouter";
        });
    }

    const [getJson] = useState(getModule());

    return (
        <div>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <LayoutSupplier match={match}>
                    {
                        
                        getJson.submodules.map((submodules) => {
                            return submodules.subroutes.map((subroute) => {
                                return React.createElement(Route, {
                                    exact: subroute.exact,
                                    path : `${match.path}${subroute.path}`,
                                    component : components[subroute.component]
                                })
                            })
                        })
                    }
                </LayoutSupplier>
            </Responsive>
            <Responsive {...Responsive.onlyMobile}>
                <Header as='h2'>Only Mobile</Header>
            </Responsive>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { config } = state;
    return {
        json : config.json
    }
}

const connectedSupplierMainRouter = connect(mapStateToProps)(SupplierMainRouter);
export { connectedSupplierMainRouter as SupplierMainRouter };
