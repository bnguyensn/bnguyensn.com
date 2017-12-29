import React from 'react';
import ReactDOM from 'react-dom';

//import Header from './pages/00_Header';
import Login from './pages/02_Login';
//import Footer from './pages/00_Footer';

import './css/index.css';
import './css/login.css';

ReactDOM.render(
    <div id="p-canvas">
        <Login />
    </div>,
    document.getElementById('root')
);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept('./pages/02_Login', () => {
        console.log('Accepting the updated Login module.');
        const Next = require('./pages/02_Login');
        ReactDOM.render(<Next />, document.getElementById('root'));
    })
}