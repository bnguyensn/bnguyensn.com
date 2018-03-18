import React from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/Index/Main';
import './css/index.css';

ReactDOM.render(
    <div id="root-canvas">
        <Main />
    </div>,
    document.getElementById('root')
);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept('./pages/Index/Main', () => {
        console.log('Accepting the updated module.');
        const Next = require('./pages/Index/Main');
        ReactDOM.render(<Next />, document.getElementById('root'));
    });
}