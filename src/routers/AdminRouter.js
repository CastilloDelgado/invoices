import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, Responsive } from 'semantic-ui-react';

import { VerticalLayout, MainLoader } from '../modules/_custom';
import { components } from './components';

const AdminRouter = ({match, userConfig, requestUserConfig}) => {
    if(requestUserConfig){
        return <MainLoader/>
    }

    return (
        <div>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <VerticalLayout match={match}>
                    <Route path={`${match.path}`} />
                    { 
                        userConfig ? 
                        userConfig.submodules.map((submodules) => {
                            return submodules.subroutes.map((subroute) => {
                                return React.createElement(Route, {
                                    exact: subroute.exact,
                                    path : `${match.path}${subroute.path}`,
                                    component : components[subroute.component]
                                })
                            })
                        }) : null
                    }
                </VerticalLayout>
            </Responsive>
            <Responsive {...Responsive.onlyMobile}>
                <Header as='h2'>Only Mobile</Header>
            </Responsive>
        </div>
    );
}

const mapStateToProps = ({config}) => {
    return {
        userConfig: config.userConfig,
        requestUserConfig : config.requestUserConfig
    }
}

const connectedMainRouter = connect(mapStateToProps)(AdminRouter);
export { connectedMainRouter as AdminRouter };
