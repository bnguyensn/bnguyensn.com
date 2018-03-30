import React, {Component} from 'react';
import BlogCanvas from './blog/components/BlogCanvas';
import './css/home.css';

function Test(props) {
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
                <BlogCanvas />
            </div>
        )
    }
}

export default Home