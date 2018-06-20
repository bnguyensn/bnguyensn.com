/* eslint global-require: 0 */

import React from 'react';
import ReactDOM from 'react-dom';

import Index from './components/Index';

import './css/global.css';

ReactDOM.render(
    <div id="root-canvas">
        <Index />
    </div>,
    document.getElementById('root'),
);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept('./components/Index', () => {
        console.log('Accepting the updated module.');
        const Next = require('./components/Index');
        ReactDOM.render(<Next />, document.getElementById('root'));
    });
}
