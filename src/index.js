import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.css';

ReactDOM.render(<App />, document.getElementById('root'));

// webpack's Hot Module Replacement
// https://webpack.js.org/guides/hot-module-replacement/
if (module.hot) {
  module.hot.accept('./App.js', () => {
    const Next = require('./App.js');
    ReactDOM.render(<Next />, document.getElementById('root'));
  });
}
