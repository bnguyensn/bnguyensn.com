import React, {Component} from 'react';
import './css/home.css';

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