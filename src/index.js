import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/01/01_Index';
import './css/index.css';

ReactDOM.render(
    <div id="root-canvas">
        <Index />
    </div>,
    document.getElementById('root')
);


// Hot Module Replacement
if (module.hot) {
    module.hot.accept('./pages/01/01_Home', () => {
        console.log('Accepting the updated Home module.');
        const Next = require('./pages/01/01_Home');
        ReactDOM.render(<Next />, document.getElementById('root'));
    })
}