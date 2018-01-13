/** ******** MAIN COMPONENT OF THE HOMEPAGE ********** **/

import React, {Component} from 'react';

import Button from './01_Button';
import '../../css/home.css';




/** Test content for the homepage */
class TestContent extends Component {
    render() {
        return (
            <div id='home-content'>
                Hello, world!
                <br/>
                We are in {process.env.NODE_ENV} mode!
                <br/>
                Click <a href="/chat">here</a> to go to the chat app.
            </div>
        )
    }
}

/** Homepage layout */
class Home extends Component {
    render() {
        return (
            <div id='home-canvas'>
                <div id='home-content-container'>
                    Some content
                </div>
            </div>
        )
    }
}

export default Home