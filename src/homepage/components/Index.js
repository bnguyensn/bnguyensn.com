// @flow

import * as React from 'react';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import Starfield from '../lib/components/Starfield';

import '../css/index.css';

/** ********** MAIN EXPORT ********** **/

class Index extends React.PureComponent<{}> {
    placeholder = () => {
        return false
    };

    render() {
        return (
            <div id="index-container">
                <Starfield />
            </div>
        );
    }
}

export default Index
