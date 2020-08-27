import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
// eslint-disable-next-line no-restricted-globals
const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "";

export const store = createStore(
    rootReducer,
    isLocalhost ?
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ) :
    applyMiddleware(
        thunkMiddleware
    ) 
);