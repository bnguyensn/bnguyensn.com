/** ******** MAIN COMPONENT OF THE HOMEPAGE ********** **/

import React, {Component} from 'react';
import Header from '../00/00_Header';
import '../../css/home.css';

/** Main content for the homepage */
class HomeContent extends Component {
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
                <Header />
                <HomeContent />
            </div>
        )
    }
}

export default Home