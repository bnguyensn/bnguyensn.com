// @flow

import * as React from 'react';
import {Router, Link} from '@reach/router';
import Loadable from 'react-loadable';
import './app.css';
import Landing from './components/Landing';
import FourOhFour from './components/404';
import Loading from './components/Loading';
import getRandNumBtw from './lib/utils/getRandNumBtw';

/** ********** REACT LOADABLE ********** **/

const Projects = Loadable({
    loader: () => import('./components/Projects'),
    loading: Loading,
});

const Contact = Loadable({
    loader: () => import('./components/Contact'),
    loading: Loading,
});

/** ********** BACKGROUND ********** **/

type BackgroundProps = {
    children?: React.Node,
};

type BackgroundStates = {
    hueDeg: number,
};

class Background extends React.PureComponent<BackgroundProps, BackgroundStates> {
    timerId: IntervalID;

    constructor(props: BackgroundProps) {
        super(props);
        this.state = {
            hueDeg: Math.round(getRandNumBtw(0, 359)),
        };
    }

    /** ********** LIFECYCLE ********** **/

    componentDidMount() {
        this.timerId = setInterval(this.tick, 1000);
    }

    /** ********** FUNCTIONALITY ********** **/

    tick = () => {
        this.setState(prevState => ({
            hueDeg: prevState.hueDeg === 359 ? 0 : prevState.hueDeg + 1,
        }));
    };

    /** ********** RENDER ********** **/

    render() {
        const {children} = this.props;
        const {hueDeg} = this.state;
        const appStyle = {
            backgroundColor: `hsl(${hueDeg}, 50%, 80%`,
        };
        return (
            <div id="app-bkg"
                 style={appStyle}>
                {children}
            </div>
        )
    }
}

/** ********** MAIN COMPONENT ********** **/



export default function App() {
    return (
        <Router>
            <Background path="/">
                <Landing path="/" />
                <Projects path="/projects" />
                <Contact path="/contact" />
                <FourOhFour default />
            </Background>
        </Router>
    )
}
