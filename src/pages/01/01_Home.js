import React, {Component} from 'react';
import ControlPanel from './01_ControlPanel';
import MessageBoard from './01_MessageBoard';
import '../../css/home.css';

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

class Home extends Component {
    render() {
        return (
            <div id='home-canvas'>
                <div id='home-content-container'>
                    <ControlPanel />
                    <MessageBoard />
                </div>
            </div>
        )
    }
}

export default Home