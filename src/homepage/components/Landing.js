// @flow

import * as React from 'react';
import {Link} from '@reach/router';
import profileImg from '../img/profile_256x256.jpg';
import '../css/landing.css';

export default function Landing() {
    return (
        <section id="landing" className="app-section">
            <div className="img-link-container">
                <a href="/">
                    <img src={profileImg} alt="profile-img" />
                </a>
            </div>

            <div id="landing-desc">
                Hi, my name is Binh and I like to hack around computers from time to time<sup>[1]</sup>.
                This sounds a bit generic though so you can check out my projects&nbsp;
                <Link to="/projects">here</Link>. My most used languages are Javascript and Python, with
                C++ hopefully next on the list.

                <br /><br />

                My contact information can be found <Link to="/contact">here</Link>. Ask me anything!

                <hr />

                <span id="landing-desc-sitecreation">
                    This site was made using <a href="https://facebook.github.io/react">React</a> with
                    routing handled by <a href="https://reach.tech/router">Reach Router</a>.
                    I use <a href="http://expressjs.com">express</a> for the back-end framework.

                    <br /><br />

                    Site design follows one simple rule: <i>&#8220;less is more&#8221;</i>. The sepia
                    colour scheme and serif font are inspired by the Financial Times.

                    <br /><br />
                    Source code can be found
                    on <a href="https://github.com/bnguyensn/bnguyensn.com">github</a>.
                </span>

                <hr />

                <span id="landing-desc-footnote">
                    <b>[1]</b> pretty much all the time
                </span>
            </div>

        </section>
    )
}
