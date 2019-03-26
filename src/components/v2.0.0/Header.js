// @flow

import * as React from 'react';
import {Link} from '@reach/router';

import {MIcon} from '../../lib/components/MIcon';

import profileImg from '../../img/profile_256x256.jpg';

import '../../css/v2.0.0/header.css';

/** ********** SUPPORT COMPONENTS ********** **/

type NavLinkProps = {
    href: string,
    children: React.Node,
    curPg: string,
    handleClick?: () => void,
}

class NavLink extends React.PureComponent<NavLinkProps> {
    render() {
        const {href, children, curPg, handleClick} = this.props;
        const activeStyleCls = curPg === href ? 'active' : '';
        return (
            <div className={`nav-link ${activeStyleCls}`} {...this.props}>
                <Link to={href} onClick={handleClick}>
                    {children}
                </Link>
            </div>
        )
    }
}

/** ********** MAIN EXPORT ********** **/

type HeaderProps = {
    curPg: string,
};

type HeaderStates = {
    sideNavbarShown: boolean,
};

class Header extends React.PureComponent<HeaderProps, HeaderStates> {
    constructor(props: HeaderProps) {
        super(props);
        this.state = {
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

    handleNavLinkClick = () => {
        // Hide side navbar
        this.setState({
            sideNavbarShown: false,
        });
    };

    /** ***** RENDER ***** **/

    render() {
        const {curPg} = this.props;
        const {sideNavbarShown} = this.state;

        const collapsedCls = curPg !== '/' ? 'collapsed' : '';
        const menuBtnIcon = sideNavbarShown ? 'close' : 'menu';
        const sideNavbarShownCls = sideNavbarShown && curPg !== '/' ? 'shown' : '';

        return (
            <section id="index-header" className={collapsedCls}>
                <nav id="header-navbar" className={collapsedCls}>
                    <NavLink href="/about" curPg={curPg}>ABOUT</NavLink>
                    <NavLink href="/blog" curPg={curPg}>BLOG</NavLink>
                    <NavLink href="/"
                             curPg={curPg}
                             id="header-profile-pic-container">
                        <img id="header-profile-pic" src={profileImg} alt="Profile" />
                    </NavLink>
                    <NavLink href="/projects" curPg={curPg}>PROJECTS</NavLink>
                    <NavLink href="/contact" curPg={curPg}>CONTACT</NavLink>
                    <div id="header-navbar-menu-btn"
                         role="button"
                         tabIndex={0}
                         onClick={this.handleNavMenuBtnClick}
                         onKeyPress={this.handleNavMenuBtnKeyboard}>
                        <MIcon icon={menuBtnIcon} />
                    </div>
                </nav>
                <nav id="header-side-navbar" className={sideNavbarShownCls}>
                    <NavLink href="/about" curPg={curPg} handleClick={this.handleNavLinkClick}>ABOUT</NavLink>
                    <NavLink href="/blog" curPg={curPg} handleClick={this.handleNavLinkClick}>BLOG</NavLink>
                    <NavLink href="/projects" curPg={curPg} handleClick={this.handleNavLinkClick}>PROJECTS</NavLink>
                    <NavLink href="/contact" curPg={curPg} handleClick={this.handleNavLinkClick}>CONTACT</NavLink>
                </nav>
            </section>
        )
    }
}

export default Header
