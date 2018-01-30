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
            Hello, I am a dude living in London who likes to code, draw, and read.
            <br/><br/>
            This place holds my writings, as well as my projects. I hope you find what you're looking for!
        </div>
    )
}

class Home extends Component {
    render() {
        return (
            <div id='home-canvas'>
                <div id='home-content-container'>
                    <Intro />
                </div>
            </div>
        )
    }
}

export default Home