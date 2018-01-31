import React from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/01/Main';
import './css/index.css';

ReactDOM.render(
    <div id="root-canvas">
        <Main />
    </div>,
    document.getElementById('root')
);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept('./pages/01/Main', () => {
        console.log('Accepting the updated module.');
        const Next = require('./pages/01/Main');
        ReactDOM.render(<Next />, document.getElementById('root'));
    });
}