import React from 'react';
import ReactDOM from 'react-dom';
import Header from './pages/00/00_Header';
import Home from './pages/01/01_Home';
import './css/index.css';

ReactDOM.render(
    <div id="root-container">
        <Header />
        <Home />
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