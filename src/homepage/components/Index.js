// @flow

import * as React from 'react';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import StarfieldFullscreen from '../lib/components/StarfieldFullscreen';

import '../css/index.css';

/** ********** MAIN EXPORT ********** **/

class Index extends React.PureComponent<{}> {
    render() {
        return (
            <div id="index-container">
                <StarfieldFullscreen />
                <Header />
                <Body />
                <Footer />
            </div>
        );
    }
}

export default Index
