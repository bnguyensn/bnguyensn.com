import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Register Service Worker
// https://webpack.js.org/guides/progressive-web-application#adding-workbox
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log(`SW registered: ${registration}`);
      })
      .catch(registrationError => {
        console.log(`SW registration failed: ${registrationError}`);
      });
  });
}

// React index render
ReactDOM.render(<App />, document.getElementById('root'));
