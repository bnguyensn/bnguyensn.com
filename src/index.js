import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import './styles/global.css';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

// webpack's Hot Module Replacement
// https://webpack.js.org/guides/hot-module-replacement/
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
    render(require('./App'));
  });
}
