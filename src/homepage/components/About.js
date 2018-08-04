// @flow

import * as React from 'react';
import {Router, Link} from '@reach/router';
import Loadable from 'react-loadable';
import Loading from './Loading';

import '../css/about.css';

/** ********** LIST OF PATHS ********** **/

const Projects = Loadable({
    loader: () => import('./Projects'),
    loading: Loading,
});

const Contact = Loadable({
    loader: () => import('./Contact'),
    loading: Loading,
});

/** ********** HELPER COMPONENTS ********** **/

class AboutBox extends React.PureComponent<{}> {
    render() {
        return (
            <div id="body-about">
                <div className="info-box">
                    Hello, my name is Binh and this is my personal site. It serves as my blog as well as an experiment
                    playground.
                    <br /><br />
                    For a list of my projects, please head over <Link to="/projects">here</Link>.
                    <br /><br />
                    For contact info, please go <Link to="/contact">here</Link>.
                    <br /><br />
                    And finally, this site&#39;s GitHub link is <Link
                    to="https://github.com/bnguyensn/bnguyensn.com">here</Link>.
                </div>
            </div>
        )
    }
}

/** ********** MAIN COMPONENT ********** **/

function About() {
    return (
        <Router>
            <AboutBox path="/" />
            <Projects path="/projects" />
            <Contact path="/contact" />
        </Router>
    )
}

export default About
