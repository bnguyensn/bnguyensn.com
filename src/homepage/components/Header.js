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
    rightOffset: number
};

class Header extends React.Component<{}, HeaderStates> {
    constructor(props: {}) {
        super(props);
        this.state = {
            sideNavbarShown: false,
            rightOffset: 0
        };
    }

    componentDidMount = () => {
        const {sideNavbarShown} = this.state;

        window.addEventListener('resize', this.toggleSideNavbarDisplay);

        this.toggleSideNavbarDisplay(sideNavbarShown);
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.toggleSideNavbarDisplay);
    };

    handleNavMenuBtnClick = () => {
        this.setState((prevState, props) => {
            this.toggleSideNavbarDisplay(!prevState.sideNavbarShown);
            return {
                sideNavbarShown: !prevState.sideNavbarShown
            }
        });
    };

    handleNavMenuBtnKeyboard = (e: SyntheticKeyboardEvent<HTMLElement>) => {
        if (e.keyCode === 13) {
            this.handleNavMenuBtnClick();
        }
    };

    toggleSideNavbarDisplay = (show: boolean) => {
        const el = document.getElementById('header-navbar');
        const elWidth = el ? el.getBoundingClientRect().width : 0;

        this.setState({
            rightOffset: show ? 0 : -elWidth
        });
    };

    render() {
        const {sideNavbarShown, rightOffset} = this.state;

        const menuBtnIcon = sideNavbarShown ? 'close' : 'menu';

        return (
            <section id="index-header">
                <ImageLink id="header-profile-pic"
                           src={profileImg}
                           alt="Profile image"
                           href="/" />
                <section id="header-title">
                    <ShufflingString resultStr="Binh Nguyen"
                                     maxShuffleTime={1500}
                                     shuffleInterval={100} />
                </section>
                <div id="header-navbar-menu-btn"
                     role="button"
                     tabIndex={0}
                     onClick={this.handleNavMenuBtnClick}
                     onKeyPress={this.handleNavMenuBtnKeyboard}>
                    <MIcon icon={menuBtnIcon} />
                </div>
                <nav id="header-navbar"
                     style={{
                         right: `${rightOffset}px`
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