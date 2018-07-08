// @flow

import * as React from 'react';
import {Link} from '@reach/router';

import ImageLink from '../lib/components/ImageLink';
import ShufflingString from '../lib/components/ShufflingString';
import {MIcon} from '../lib/components/MIcon';

import profileImg from '../img/profile_256x256.jpg';

import '../css/header.css';

/** ********** SUPPORT COMPONENTS ********** **/

type NavLinkProps = {
    href: string,
    text: string
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
    sideNavbarShown: boolean,
    sideNavbarRightOffset: number,
    titleText: string
};

class Header extends React.PureComponent<{}, HeaderStates> {
    constructor(props: {}) {
        super(props);
        this.state = {
            sideNavbarShown: false,
            sideNavbarRightOffset: 0,
            titleText: "Binh Nguyen"
        };
    }

    componentDidMount = () => {
        const sideNavbarW = this.getSideNavbarWidth();

        this.setState({
            sideNavbarRightOffset: -sideNavbarW
        });

        window.onresize = this.handleWindowResize;
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleWindowResize);
    };

    handleWindowResize = () => {
        const {sideNavbarShown, titleText} = this.state;

        // Adjust side nav bar position
        const sideNavbarW = this.getSideNavbarWidth();
        const newSideNavbarRightOffset = sideNavbarShown ? 0 : -sideNavbarW;

        // Update title if screen too small
        const newTitleText = window.innerWidth >= 400 ? "Binh Nguyen" : "B.N";

        this.setState((prevState, props) => ({
            sideNavbarRightOffset: newSideNavbarRightOffset,
            titleText: newTitleText
        }));

    //
    };

    handleNavMenuBtnClick = () => {
        const sideNavbarW = this.getSideNavbarWidth();
        this.setState((prevState, props) => ({
            sideNavbarShown: !prevState.sideNavbarShown,
            sideNavbarRightOffset: !prevState.sideNavbarShown ? 0 : -sideNavbarW
        }));
    };

    handleNavMenuBtnKeyboard = (e: SyntheticKeyboardEvent<HTMLElement>) => {
        if (e.keyCode === 13) {
            this.handleNavMenuBtnClick();
        }
    };

    getSideNavbarWidth = () => {
        const el = document.getElementById('header-side-navbar');
        return el ? el.getBoundingClientRect().width : 0
    };

    render() {
        const {sideNavbarShown, sideNavbarRightOffset, titleText} = this.state;

        const menuBtnIcon = sideNavbarShown ? 'close' : 'menu';

        return (
            <section id="index-header">
                <ImageLink id="header-profile-pic"
                           src={profileImg}
                           alt="Profile image"
                           href="/" />
                <section id="header-title">
                    <span>{titleText}</span>
                    {/*<ShufflingString resultStr={titleText}
                                     maxShuffleTime={1500}
                                     shuffleInterval={100} />*/}
                </section>
                <div id="header-navbar-menu-btn"
                     role="button"
                     tabIndex={0}
                     onClick={this.handleNavMenuBtnClick}
                     onKeyPress={this.handleNavMenuBtnKeyboard}>
                    <MIcon icon={menuBtnIcon} />
                </div>
                <nav id="header-navbar">
                    <NavLink href="/about" text="ABOUT" />
                    <NavLink href="/blog" text="BLOG" />
                    <NavLink href="/projects" text="PROJECTS" />
                    <NavLink href="/contact" text="CONTACT" />
                </nav>
                <nav id="header-side-navbar"
                     style={{
                         right: `${sideNavbarRightOffset}px`
                     }}>
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