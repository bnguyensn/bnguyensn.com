// @flow

import * as React from 'react';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

import '../css/index.css';

class Index extends React.PureComponent<{}> {
    placeholder = () => {

    };

    render() {
        return (
            <div id="index-container">
                <Header />
                <Body />
                <Footer />
            </div>
        );
    }
}

export default Index;
