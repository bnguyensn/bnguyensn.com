import React from 'react';
import ReactDOM from 'react-dom';
//import Header from './pages/00_Header';
import GameCanvas from './pages/04/04_GameCanvas';
//import Footer from './pages/00_Footer';
import './css/index.css';

ReactDOM.render(
    <div id="celeb-origin-canvas">
        <GameCanvas />
    </div>,
    document.getElementById('root')
);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept('./pages/04/04_GameCanvas', () => {
        console.log('Accepting the updated Game Canvas module.');
        const Next = require('./pages/04/04_GameCanvas');
        ReactDOM.render(<Next />, document.getElementById('root'));
    })
}