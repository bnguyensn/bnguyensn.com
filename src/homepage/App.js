// @flow

import * as React from 'react';
import {Router, Link} from '@reach/router';
import Loadable from 'react-loadable';
import './app.css';
import Landing from './components/Landing';
import FourOhFour from './components/404';
import Loading from './components/Loading';

/** ********** REACT LOADABLE ********** **/

const Projects = Loadable({
    loader: () => import('./components/Projects'),
    loading: Loading,
});

const Contact = Loadable({
    loader: () => import('./components/Contact'),
    loading: Loading,
});

/** ********** MAIN COMPONENT ********** **/

export default function App() {
    return (
        <Router>
            <Landing path="/" />
            <Projects path="/projects" />
            <FourOhFour default />
        </Router>
    )
}
