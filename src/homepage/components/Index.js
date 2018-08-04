// @flow

import * as React from 'react';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import StarfieldFullscreen from '../lib/components/StarfieldFullscreen';

import '../css/index.css';

/** ********** MAIN EXPORT ********** **/

class Index extends React.PureComponent<{}, {curPg: string}> {
    constructor() {
        super();
        this.state = {
            curPg: '/'
        };
    }

    render() {
        const {curPg} = this.state;

        return (
            <div id="index-container">
                <StarfieldFullscreen />
                <Header curPg={curPg} />
                <Body curPg={curPg} />
            </div>
        );
    }
}

export default Index
