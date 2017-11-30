import React from 'react';
import ReactDOM from 'react-dom';

import {AppContainer} from 'react-hot-loader';

import Home from './pages/010_home';

import './css/index.css';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
};

render(Home);

if (module.hot) {
    module.hot.accept('./pages/010_home', () => {
        render(Home);
    });
}
