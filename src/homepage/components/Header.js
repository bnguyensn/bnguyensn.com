// @flow

import * as React from 'react';
import {Link} from '@reach/router';

import {MIcon} from '../lib/components/MIcon';

import profileImg from '../img/profile_256x256.jpg';

import '../css/header.css';

/** ********** SUPPORT COMPONENTS ********** **/

type NavLinkProps = {
    href: string,
    toggleCollapse: (collapse: boolean) => void,
    children: React.Node,
}

class NavLink extends React.PureComponent<NavLinkProps> {
    handleNavLinkClick = (e: SyntheticMouseEvent<HTMLElement> | SyntheticKeyboardEvent<HTMLElement>) => {
        const {toggleCollapse} = this.props;

        // <NavLink /> only has 1 child which is the <a> element, hence we can
        // get the target location like so:
        const linkEl = e.currentTarget.querySelector('a');
        const targetLoc = linkEl ? linkEl.getAttribute('href') : '';

        // Expand / collapse the header
        if (targetLoc !== '/') {
            toggleCollapse(true);
        } else {
            toggleCollapse(false);
        }
    };

    handleNavLinkKeyboard = (e: SyntheticKeyboardEvent<HTMLElement>) => {
        // Expand / collapse the header on Enter
        if (e.keyCode === 13) {
            this.handleNavLinkClick(e);
        }
    };

    render() {
        const {href, children} = this.props;
        return (
            <div className="nav-link"
                 role="button"
                 tabIndex={0}
                 onClick={this.handleNavLinkClick}
                 onKeyPress={this.handleNavLinkKeyboard}
                 {...this.props}>
                <Link to={href}>
                    {children}
                </Link>
            </div>
        )
    }
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
    }

    /** ***** EVENT HANDLERS ***** **/

    handleNavMenuBtnClick = () => {
        // Show / hide side navbar
        this.setState((prevState, props) => ({
            sideNavbarShown: !prevState.sideNavbarShown,
        }));
    };

    handleNavMenuBtnKeyboard = (e: SyntheticKeyboardEvent<HTMLElement>) => {
        // Show / hide side navbar on Enter
        if (e.keyCode === 13) {
            this.handleNavMenuBtnClick();
        }
    };

    toggleHeaderCollapse = (collapse: boolean) => {
        this.setState({
            headerCollapsed: collapse,
        });
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
                    <NavLink href="/about" toggleCollapse={this.toggleHeaderCollapse}>
                        ABOUT
                    </NavLink>
                    <NavLink href="/blog" toggleCollapse={this.toggleHeaderCollapse}>
                        BLOG
                    </NavLink>
                    <NavLink href="/" toggleCollapse={this.toggleHeaderCollapse}
                             id="header-profile-pic-container">
                        <img id="header-profile-pic" src={profileImg} alt="Profile" />
                    </NavLink>
                    <NavLink href="/projects" toggleCollapse={this.toggleHeaderCollapse}>
                        PROJECTS
                    </NavLink>
                    <NavLink href="/contact" toggleCollapse={this.toggleHeaderCollapse}>
                        CONTACT
                    </NavLink>
                    <div id="header-navbar-menu-btn"
                         role="button"
                         tabIndex={0}
                         onClick={this.handleNavMenuBtnClick}
                         onKeyPress={this.handleNavMenuBtnKeyboard}>
                        <MIcon icon={menuBtnIcon} />
                    </div>
                </nav>
                <nav id="header-side-navbar" className={sideNavbarShownCls}>
                    <NavLink href="/about" toggleCollapse={this.toggleHeaderCollapse}>
                        ABOUT
                    </NavLink>
                    <NavLink href="/blog" toggleCollapse={this.toggleHeaderCollapse}>
                        BLOG
                    </NavLink>
                    <NavLink href="/projects" toggleCollapse={this.toggleHeaderCollapse}>
                        PROJECTS
                    </NavLink>
                    <NavLink href="/contact" toggleCollapse={this.toggleHeaderCollapse}>
                        CONTACT
                    </NavLink>
                </nav>
            </section>
        )
    }
}

export default Header
