// @flow

import * as React from 'react';

import NavBar from './NavBar';
import ImageLink from '../lib/components/ImageLink';
import ShufflingString from '../lib/components/ShufflingString';

import profileImg from '../img/profile_256x256.jpg';

import '../css/header.css';

/** ********** SUPPORT COMPONENTS ********** **/

function Cover(props: {children?: React.Node}) {
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

Cover.defaultProps = {children: document.createTextNode('')};

/** ********** MAIN EXPORT ********** **/

function Header() {
    return (
        <section id="index-header">
            <Cover>
                <ImageLink
                    src={profileImg}
                    alt="Profile image"
                    shape="round"
                    size="large"
                    href="/"
                />
                <section id="header-title">
                    <ShufflingString
                        resultStr="Binh Nguyen"
                        maxShuffleTime={1500}
                        shuffleInterval={100}
                    />
                </section>
            </Cover>
            <NavBar />
        </section>
    );
}

export default Header