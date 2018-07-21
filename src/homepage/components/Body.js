// @flow

import * as React from 'react';
import {Router} from '@reach/router';
import Loadable from 'react-loadable';
import Loading from './Loading';

import '../css/body.css';

/** ********** LIST OF PATHS ********** **/

const About = Loadable({
    loader: () => import('./About'),
    loading: Loading,
});

const Blog = Loadable({
    loader: () => import('./Blog'),
    loading: Loading,
});

const Projects = Loadable({
    loader: () => import('./Projects'),
    loading: Loading,
});

const Contact = Loadable({
    loader: () => import('./Contact'),
    loading: Loading,
});

/** ********** MAIN COMPONENT ********** **/

function Body() {
    return (
        <Router>
            <section id="index-body">
                <About path="about" />
                <Blog path="blog" />
                <Projects path="projects" />
                <Contact path="contact" />
            </section>
        </Router>
    );
}

export default Body
