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
    }

    /** ***** EVENT HANDLERS ***** **/

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


            </section>
        )
    }
}

export default Header