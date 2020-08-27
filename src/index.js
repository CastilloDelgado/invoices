import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import { App } from './App';
import './semantic/dist/semantic.min.css';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);