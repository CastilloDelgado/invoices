import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

import { history } from './helpers';
import { alertActions } from './modules/Alert';
import { configActions } from './modules/Config';
import { components } from './componentCollection';

//import * as Vibrant from 'node-vibrant'
import { MainLoader } from './modules/_custom';
//import ClearCache from "react-clear-cache";

toast.configure()

class App extends React.Component {
    constructor(props) {
        super(props);
        const { _alertClear } = this.props;
        // history.listen((location, action) => {
        //     console.log(location,action);
        //     _alertClear();
        // });
    }


    componentWillMount() {
        const { json } = this.props;
        document.title = "Nexus | Kronosoft"
        //Vibrant.from(logo).getPalette((err, palette) => console.log(palette))
        if (!json) {
            this.props._getConfig();
        }
    }

    render() {
        const { requesting, json } = this.props;
        if (requesting || typeof json === 'undefined')
            return <MainLoader />
        else
            return (
                /*< ClearCache >
                    {({ isLatestVersion, emptyCacheStorage }) => (
                        <div>
                            {!isLatestVersion ?
                                <p>
                                    <a
                                        href="#"
                                        onClick={e => {
                                            e.preventDefault();
                                            emptyCacheStorage();
                                        }} >
                                        Update version
                                    </a>
                                </p>
                                :*/
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={components["MainRouter"]} />
                        <Route exact path="/logout" render={() => (<Redirect to="/login" />)} />

                        {
                            json.modules.map((x, i) => {
                                return React.createElement(components[x.component],
                                    {
                                        path: x.path,
                                        component: components[x.render]
                                    });
                            })
                        }

                        {
                            json.modules.map((item, index) => {
                                return item.routes.map((route) => {
                                    return <Route exact path={String(route.path)} component={components[route.component]} />
                                })
                            })
                        }

                        <Route path="*" component={components["NotFound"]} />

                        <ToastContainer
                            position="top-right"
                            autoClose={false}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnVisibilityChange
                            draggable
                            pauseOnHover
                        />
                    </Switch>
                </Router>
                /*}
            </div>
        )
        }

    </ClearCache>*/
            );
    }
}

function mapStateToProps(state) {
    const { alert, config } = state;
    return {
        json: config.json,
        requesting: config.requesting,
        alert: alert
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        _getConfig: () => dispatch(configActions.getConfig()),
        _alertClear: () => dispatch(alertActions.clear())
    }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };
