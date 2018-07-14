// @flow

import * as React from 'react';

import RainbowString from '../lib/components/RainbowString';

import '../css/homepage.css';

function Homepage() {
    return (
        <section id="body-homepage">
            {/*<span>Hi, I&apos;m Binh</span>
            <span>and this is my site</span>*/}
            <RainbowString s="Hello!" d={1} r />
        </section>
    )
}

export default Homepage
