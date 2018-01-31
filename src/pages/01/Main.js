import React, {Component} from 'react';
import classnames from 'classnames';
import MIcon from '../00/MIcon';
import '../../css/main.css';
import '../../css/headerfooter.css';

/** ********** HELPERS ********** **/

class LoadingPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='#main-loader-canvas' className={`loader-text ${this.props.display}`}>
                loading...
            </div>
        )
    }
}

/** ********** HEADER ********** **/

function NavButton(props) {
    const extraCls = props.extraCls !== undefined ? props.extraCls : '';
    const is_active = props.active ? 'active' : '';

    function navigate(e) {
        e.preventDefault();

        window.history.pushState({url: props.link}, '', props.link);

        props.navigate(props.link)
    }

    return (
        <a className={`nav-btn-link ${extraCls} ${is_active}`} href={props.link} onClick={navigate}>
            <div className='nav-btn'>
                <span className='nav-btn-content'>
                    {props.content}
                </span>
                <span className='nav-btn-content'>
                    {props.contentIcon}
                </span>
            </div>
        </a>
    )
}

/**
 * This component is created for styling purpose.
 * The intention is to have the site title on a separate section with the remaining nav buttons.
 * */
function NavSection(props) {
    return (
        <div className='navs-section'>
            {props.children}
        </div>
    )
}

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='header-canvas'>
                <div id='header-container'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

/** ********** MAIN LAYOUT ********** **/

/**
 * The top-level controller of our SPA-style site. All states should be stored here.
 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);

        this.state = {
            active_link: '',
            cur_pg: null,
        };

        /**
         * Store all dynamic import functions for lazy-loading purposes
         *
         * @type {object}
         * */
        this.import_dict = {
            '/': () => import(/* webpackChunkName: "homepage" */ './Home'),
            '/about': () => import(/* webpackChunkName: "about" */ './About'),
            '/archive': () => import(/* webpackChunkName: "archive" */ './Archive'),
            '/projects': () => import(/* webpackChunkName: "projects" */ './Projects'),
            '/contact': () => import(/* webpackChunkName: "contact" */ './Contact'),
        };

        /**
         * window.onpopstate is triggered when the user clicks the browser's back / forward button
         * we check if e.state exists to see if the history entry was created by our pushState() / replaceState()
         *
         * ***NOTE: Chrome <34 and Safari <10 always emit a popstate event on page load, but Firefox doesn't
         * */
        window.onpopstate = (e) => {
            if (e.state) {
                this.navigate(e.state.url);
            }
        };

        /**
         * Perform a navigation on the first load
         * */
        this.navigate(window.location.pathname);
    }

    /**
     * Replace the area between the header and footer with a page of some sort.
     *
     * The main caution with this method is the loading indicator. For example, if the user's network speed is
     * too high, the loading indicator might flash abruptly, leading to bad UX.

     * Because of this, we are leaving the loading screen for now.
     *
     * @param {String} link: link to the target page e.g. '/'
     */
    navigate(link) {
        const importFunc = this.import_dict[link];

        importFunc().then((module) => {
            const Module = module.default;
            this.setState({
                active_link: link,
                cur_pg: <Module />,
            });
        });
    }

    render() {
        return (
            <div>
                <Header>
                    <NavSection>
                        <NavButton extraCls='text-bold'
                                   link='/' content='binh nguyen' contentIcon='b.n'
                                   active={this.state.active_link === '/'}
                                   navigate={this.navigate} />
                    </NavSection>
                    <NavSection>
                        <NavButton link='/about' content='about' contentIcon={<MIcon icon='account_box' />}
                                   active={this.state.active_link === '/about'}
                                   navigate={this.navigate} />
                        <NavButton link='/archive' content='archive' contentIcon={<MIcon icon='archive' />}
                                   active={this.state.active_link === '/archive'}
                                   navigate={this.navigate} />
                        <NavButton link='/projects' content='projects' contentIcon={<MIcon icon='weekend' />}
                                   active={this.state.active_link === '/projects'}
                                   navigate={this.navigate} />
                        <NavButton link='/contact' content='contact' contentIcon={<MIcon icon='mail' />}
                                   active={this.state.active_link === '/contact'}
                                   navigate={this.navigate} />
                    </NavSection>
                </Header>
                <div id='main-canvas'>
                    <div id='main-content-canvas'>
                        {this.state.cur_pg}
                    </div>
                </div>
            </div>
        )
    }
}

export default Main