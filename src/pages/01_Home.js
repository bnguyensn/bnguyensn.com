import React, {Component} from 'react';

import '../css/index.css';

class Home extends Component {
    render() {
        return(
            <div id='home'>
                Hello, world!
                <br/>
                We are in {process.env.NODE_ENV} mode!
                <br/>
                Click <a href="/chat">here</a> to go to the chat app.
            </div>
        )
    }
}

export default Home