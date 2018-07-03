// @flow

import * as React from 'react';

import NavBar from './NavBar';
import ImageLink from '../lib/components/ImageLink';
import ShufflingString from '../lib/components/ShufflingString';
import {MIcon} from '../lib/components/MIcon';

import profileImg from '../img/profile_256x256.jpg';

import '../css/header.css';

/** ********** MAIN EXPORT ********** **/

function Header() {
    return (
        <section id="index-header">
            <ImageLink className="header-profile-pic"
                       src={profileImg}
                       alt="Profile image"
                       href="/" />
            <section className="header-title">
                <ShufflingString resultStr="Binh Nguyen"
                                 maxShuffleTime={1500}
                                 shuffleInterval={100} />
            </section>
            <div id="navbar-menu-btn"
                 role="button"
                 tabIndex={0}>
                <MIcon icon="menu" />
            </div>
        </section>
    );
}

export default Header