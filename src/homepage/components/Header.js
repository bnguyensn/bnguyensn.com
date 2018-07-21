// @flow

import * as React from 'react';
import {Link} from '@reach/router';

import ImageLink from '../lib/components/ImageLink';
import {MIcon} from '../lib/components/MIcon';

import profileImg from '../img/profile_256x256.jpg';

import '../css/header.css';

/** ********** SUPPORT COMPONENTS ********** **/

type NavLinkProps = {
    href: string,
    text: string,
}

function NavLink(props: NavLinkProps) {
    const {href, text} = props;
    return (
        <div className="nav-link">
            <Link to={href}>
                {text}
            </Link>
        </div>
    )
}

/** ********** MAIN EXPORT ********** **/

type HeaderStates = {
    headerCollapsed: boolean,
    sideNavbarShown: boolean,
};

class Header extends React.PureComponent<{}, HeaderStates> {
    constructor(props: {}) {
        super(props);
        this.state = {
            headerCollapsed: false,
            sideNavbarShown: false,
        };
        window.onhashchange = this.handleHashChange;
    }

    /** ***** COMPONENT LIFECYCLE ***** **/

    componentWillUnmount = () => {
        window.removeEventListener('hashchange', this.handleHashChange);
    };

    /** ***** EVENT HANDLERS ***** **/

    // $FlowFixMe
    handleHashChange = (e) => {
        console.log(e.newURL);
        console.log(e.oldURL);
    };

    handleNavMenuBtnClick = () => {
        this.setState((prevState, props) => ({
            sideNavbarShown: !prevState.sideNavbarShown,
        }));
    };

    handleNavMenuBtnKeyboard = (e: SyntheticKeyboardEvent<HTMLElement>) => {
        if (e.keyCode === 13) {
            this.handleNavMenuBtnClick();
        }
    };

    handleProfileBtnClick = () => {
        this.setState((prevState, props) => ({
            headerCollapsed: !prevState.headerCollapsed,
        }));
    };

    /** ***** RENDER ***** **/

    render() {
        const {headerCollapsed, sideNavbarShown} = this.state;

        const collapsedCls = headerCollapsed ? 'collapsed' : '';
        const menuBtnIcon = sideNavbarShown ? 'close' : 'menu';
        const sideNavbarShownCls = sideNavbarShown && headerCollapsed ? 'shown' : '';

        return (
            <section id="index-header" className={collapsedCls}>
                <nav id="header-navbar" className={collapsedCls}>
                    <NavLink href="/about" text="ABOUT" />
                    <NavLink href="/blog" text="BLOG" />
                    <ImageLink className="header-profile-pic"
                               src={profileImg} alt="Profile image" href="#"
                               onClick={this.handleProfileBtnClick} />
                    <NavLink href="/projects" text="PROJECTS" />
                    <NavLink href="/contact" text="CONTACT" />
                    <div id="header-navbar-menu-btn"
                         role="button"
                         tabIndex={0}
                         onClick={this.handleNavMenuBtnClick}
                         onKeyPress={this.handleNavMenuBtnKeyboard}>
                        <MIcon icon={menuBtnIcon} />
                    </div>
                </nav>
                <nav id="header-side-navbar" className={sideNavbarShownCls}>
                    <NavLink href="/about" text="ABOUT" />
                    <NavLink href="/blog" text="BLOG" />
                    <NavLink href="/projects" text="PROJECTS" />
                    <NavLink href="/contact" text="CONTACT" />
                </nav>
            </section>
        )
    }
}

export default Header
