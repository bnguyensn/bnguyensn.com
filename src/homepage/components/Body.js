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

const FourOhFour = Loadable({
    loader: () => import('./404'),
    loading: Loading,
});

/** ********** WRAPPER COMPONENT ********** **/

function BodyWrapper(props: {children: React.Node}) {
    const {children} = props;
    return (
        <section id="index-body">
            {children}
        </section>
    )
}

/** ********** MAIN COMPONENT ********** **/

function Body() {
    return (
        <Router>
            <BodyWrapper path="/">
                <About path="/about" />
                <Blog path="/blog" />
                <Projects path="/projects" />
                <Contact path="/contact" />
            </BodyWrapper>
        </Router>
    );
}

export default Body
