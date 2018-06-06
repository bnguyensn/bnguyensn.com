// @flow
'use strict';

import React, {Component, PureComponent} from 'react';

import ImageLink from './components/ImageLink';
import {MIconSVG, MIconSVGLink} from '../../components/MIcon';
import Link from '../../components/Link';
import ShufflingString from './components/ShufflingString';
import WorldTravelMap from '../../widgets/world-travel-map/WorldTravelMap';

import profileImg from './img/bnguyensn.jpg';
import socialMediaInfo from './json/social-media-info.json';
import programmingLangInfo from './json/programming-language-info';

import './css/index.css';

/** ********** HEADER COMPONENT ********** **/

class Header extends PureComponent<{}> {
    render() {
        return (
            <div id='index-header'>
                <ImageLink src={profileImg} alt='Profile image'
                           shape='round' size='large'
                           href='/'/>
                <h1>
                    <ShufflingString resultStr='Binh Nguyen'
                                     shuffleInterval={50}
                                     maxShuffleTime={1500} />
                </h1>
            </div>
        )
    }
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
                      extraClsNme={socialMedia}
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

class TerminalInput extends PureComponent<{}> {
    render() {
        return (
            <input id='terminal-input' type='text'
                   placeholder='Ask me anything...' />
        )
    }
}

function Terminal(props) {
    return (
        <div id='terminal'>
            <div className='index-body-wrapper'>
                <TerminalInput />
            </div>
        </div>
    )
}

/** ***** CREDITS ***** **/

function Credits(props) {
    return (
        <div id='credits'>
            <div className='index-body-wrapper'>
                <span id='credits-text'>
                    Site powered by <Link href='https://expressjs.com' text='express' />
                    , <Link href='https://reactjs.org' text='React' />
                    , and <Link href='https://webpack.js.org' text='webpack' />.
                </span>
            </div>
        </div>
    )
}

/** ***** BODY ***** **/

function Body(props) {
    return (
        <div id='index-body'>
            <ContactRow />
            
            <Credits />
        </div>
    )
}

/** ********** INDEX (LANDING) PAGE ********** **/

class Index extends PureComponent<{}> {
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