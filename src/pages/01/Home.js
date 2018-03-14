import React, {Component} from 'react';
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

function Intro(props) {
    return (
        <div id='home-intro'>
            There doesn't seem to be anything here. Until now...
        </div>
    )
}

class Home extends Component {
    render() {
        return (
            <div id='home-canvas'>
                <Intro />
            </div>
        )
    }
}

export default Home