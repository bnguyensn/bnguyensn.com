// @flow
'use strict';

import React, {Component} from 'react';

import ImageLink from './components/ImageLink';
import {MIconSVGLink} from '../../components/MIcon';

import profileImg from './img/bnguyensn.jpg';
import socialMediaInfo from './img/ico/social-media-info.json';

import './css/index.css';

/** HEADER COMPONENT **/

function Header(props) {
    return (
        <div id='index-header'>
            <ImageLink src={profileImg} alt='Profile image'
                       shape='round' size='large'
                       href='/'/>
            <h1>Binh Nguyen</h1>
        </div>
    )
}

/** BODY COMPONENT **/

function ContactRow(props) {
    const socialMediaList = Object.keys(socialMediaInfo);
    const socialMediaIconList = socialMediaList.map((socialMedia) =>
        <MIconSVGLink key={socialMedia}
                      href={socialMediaInfo[socialMedia].href}
                      svgD={socialMediaInfo[socialMedia].d}
                      svgFill={socialMediaInfo[socialMedia].fill} />
    );

    return (
        <div id='contact-row'>
            {socialMediaIconList}
        </div>
    )
}

function Body(props) {
    return (
        <div id='index-body'>
            <ContactRow />
        </div>
    )
}

/** INDEX (LANDING) PAGE **/

class Index extends Component<{}> {
    render() {
        return (
            <div id='index-container'>
                <Header />
                <Body />
            </div>
        )
    }
}

export default Index