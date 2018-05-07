// @flow
'use strict';

import React, {Component} from 'react';

import ImageLink from './components/ImageLink';
import {MIconSVG, MIconSVGLink} from '../../components/MIcon';

import profileImg from './img/bnguyensn.jpg';
import socialMediaInfo from './json/social-media-info.json';
import programmingLangInfo from './json/programming-language-info';

import './css/index.css';

/** ********** HEADER COMPONENT ********** **/

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

/** ********** BODY COMPONENT ********** **/

/** ***** DIVIDER ***** **/

function DividerRow(props) {
    return (
        <div className='divider-row'>
            {'✦ ✦ ✦'}
        </div>
    )
}

/** ***** CONTACT ROW ***** **/

function ContactRow(props) {
    const socialMediaList = Object.keys(socialMediaInfo);
    const socialMediaIconList = socialMediaList.map((socialMedia) =>
        <MIconSVGLink key={socialMedia}
                      href={socialMediaInfo[socialMedia].href}
                      svgD={socialMediaInfo[socialMedia].d}
                      svgFill={socialMediaInfo[socialMedia].fill} />
    );

    return (
        <div className='icon-row'>
            {socialMediaIconList}
        </div>
    )
}

/** ***** SKILL ROW ***** **/

function ProgrammingLangRow(props) {
    const programmingLangList = Object.keys(programmingLangInfo);
    const programmingLangIconList = programmingLangList.map((programmingLang) =>
        <MIconSVG key={programmingLang}
                  svgD={programmingLangInfo[programmingLang].d}
                  svgFill={programmingLangInfo[programmingLang].fill} />
    );

    return (
        <div className='icon-row'>
            {programmingLangIconList}
        </div>
    )
}

/** ***** TERMINAL ***** **/

function Terminal(props) {
    return (
        <div id='terminal'>

        </div>
    )
}

/** ***** BODY ***** **/

function Body(props) {
    return (
        <div id='index-body'>
            <ContactRow />
            <DividerRow />
            <ProgrammingLangRow />
        </div>
    )
}

/** ********** INDEX (LANDING) PAGE ********** **/

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