// @flow

import { hot } from 'react-hot-loader';
import * as React from 'react';
// $FlowFixMe
import 'normalize.css';
import './styles/app.css';
import './styles/global.css';
import Button from './components/Button';
import NavBar from './components/NavBar';

function App() {
  return (
    <div id="app">
      <NavBar />
      <div id="app-content">
        Hello, world!
        <Button
          text="Hello, world!"
          action={() => {
            console.log('Hello, world!');
          }}
        />
      </div>
    </div>
  );
}

export default hot(module)(App);
