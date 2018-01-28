import React from 'react';
import ReactDOM from 'react-dom';

import Header from './pages/00/00_Header';
import Chat from './pages/03/03_Chat';
import Footer from './pages/00/Footer';

import './css/index.css';

ReactDOM.render(
    <div>
        <Header />
        <Chat />
        <Footer />
    </div>,
    document.getElementById('root')
);