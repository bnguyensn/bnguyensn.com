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

    function navigate(e) {
        e.preventDefault();

        window.history.pushState({url: props.link}, '', props.link);

        props.navigate(props.link)
    }

    return (
        <a className={`nav-btn-link ${extraCls}`} href={props.link} onClick={navigate}>
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

class Header extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.mounted(this.props.name);
    }

    render() {
        return (
            <div id='header-canvas'>
                <div id='header-container'>
                    <div id='header-title'>
                        <NavButton extraCls='nav-btn-title' link='/' content='binh nguyen' contentIcon='b.n'
                                   navigate={this.props.navigate} />
                    </div>
                    <div id='header-navs'>
                        <NavButton link='/about' content='about' contentIcon={<MIcon icon='account_box' />}
                                   navigate={this.props.navigate} />
                        <NavButton link='/archive' content='archive' contentIcon={<MIcon icon='archive' />}
                                   navigate={this.props.navigate} />
                        <NavButton link='/projects' content='projects' contentIcon={<MIcon icon='weekend' />}
                                   navigate={this.props.navigate} />
                        <NavButton link='/contact' content='contact' contentIcon={<MIcon icon='mail' />}
                                   navigate={this.props.navigate} />
                    </div>
                </div>
            </div>
        )    
    }
    
}

/** ********** MAIN LAYOUT ********** **/

/**
 * The top-level controller of our SPA-style site. All states should be stored here.
 */
class Index extends Component {
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
        this.childMounted = this.childMounted.bind(this);
        this.state = {
            loading: true,
            header_mounted: false,
            cur_pg: <LoadingPage />,
        };

        /**
         * Store all dynamic import functions for lazy-loading purposes
         * @type {object}
         * */
        const import_dict = {
            '/': () => import(/* webpackChunkName: "homepage" */ './Home'),
            '/about': () => import(/* webpackChunkName: "about" */ './About'),
            '/archive': () => import(/* webpackChunkName: "archive" */ './Archive'),
            '/projects': () => import(/* webpackChunkName: "projects" */ './Projects'),
            '/contact': () => import(/* webpackChunkName: "contact" */ './Contact'),
        };
        this.import_dict = import_dict;

        window.onpopstate = (e) => {
            if (e.state) {
                this.navigate(e.state.url);
            }
        }
    }

    /**
     * Replace the area between the header and footer with a page of some sort.
     * @param {String} link: link to the target page e.g. '/'
     */
    navigate(link) {
        const importFunc = this.import_dict[link];

        this.setState({
            loading: true,
            cur_pg: <LoadingPage />
        }, () => {
            importFunc().then((module) => {
                const Module = module.default;
                this.setState({
                    cur_pg: <Module />,
                    loading: false,
                });
            })
        });
    }

    childMounted(childName) {
        this.setState({
            [`${childName}_mounted`]: true
        }, () => {
            if (this.state.header_mounted) {
                const cur_pg_path = window.location.pathname;

                // The section below is slightly different to our normal navigate()
                this.import_dict[cur_pg_path]().then(
                    (module) => {
                        const Module = module.default;
                        this.setState({
                            cur_pg: <Module />,
                            loading: false
                        });
                    }
                );
            }
        });
    }

    render() {
        const content_display = classnames({'hidden-vis': this.state.loading});

        return (
            <div>
                <Header import_dict={this.import_dict}
                        name='header'
                        mounted={this.childMounted}
                        navigate={this.navigate} />
                <div id='main-canvas'>
                    <div id='main-content-canvas' className={content_display}>
                        {this.state.cur_pg}
                    </div>
                </div>

            </div>
        )
    }
}

export default Index