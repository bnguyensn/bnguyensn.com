import React from 'react';
import ReactDOM from 'react-dom';

import Index from './pages/Index/Index';

import './css/index.css';

ReactDOM.render(
    <div id="root-canvas">
        <Index />
    </div>,
    document.getElementById('root'),
);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept('./pages/Index/Index', () => {
        console.log('Accepting the updated module.');
        const Next = require('./pages/Index/Index');
        ReactDOM.render(<Next />, document.getElementById('root'));
    });
}
