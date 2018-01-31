import React from 'react';
import ReactDOM from 'react-dom';
import Waterfall from './pages/projects/Waterfall';
import './css/index.css';

ReactDOM.render(
    <div id="waterfall-canvas">
        <Waterfall />
    </div>,
    document.getElementById('root')
);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept('./pages/projects/Waterfall', () => {
        console.log('Accepting the updated module.');
        const Next = require('./pages/projects/Waterfall');
        ReactDOM.render(<Next />, document.getElementById('root'));
    })
}