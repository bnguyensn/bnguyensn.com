// @flow

import { hot } from 'react-hot-loader';
import * as React from 'react';
import './styles/app.css';
import './styles/global.css';
import Button from './components/Button';

function App() {
  return (
    <div id="app">
      <Button
        text="Hello, world!"
        action={() => {
          console.log('Hello, world!');
        }}
      />
    </div>
  );
}

export default hot(module)(App);
