// @flow

import * as React from 'react';
import {Router} from '@reach/router';
import Loadable from 'react-loadable';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import Loading from './Loading';
import StarfieldFullscreen from '../lib/components/StarfieldFullscreen';

import '../css/index.css';

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

/** ********** MAIN EXPORT ********** **/

type SetCurPgFuncType = (newCurPg: string) => void;

class BodyIndex extends React.PureComponent<{setCurPg: SetCurPgFuncType}> {
    componentDidMount() {
        const {setCurPg} = this.props;
        setCurPg('/');
    }

    render() {
        return (
            <span />
        )
    }
}

class Index extends React.PureComponent<{}, {curPg: string}> {
    constructor() {
        super();
        this.state = {
            curPg: '/',
        };
    }

    setCurPg = (newCurPg: string) => {
        this.setState({
            curPg: newCurPg,
        });
    };

    render() {
        const {curPg} = this.state;

        return (
            <div id="index-container">
                <StarfieldFullscreen />
                <Router>
                    <Body path="/">
                        <BodyIndex setCurPg={this.setCurPg} path="/" />
                        <About path="/about" setCurPg={this.setCurPg} />
                        <Blog path="/blog" setCurPg={this.setCurPg} />
                        <Projects path="/projects" setCurPg={this.setCurPg} />
                        <Contact path="/contact" setCurPg={this.setCurPg} />
                    </Body>
                </Router>
                <Header curPg={curPg} />
            </div>

        );
    }
}

export default Index
