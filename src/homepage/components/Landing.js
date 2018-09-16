// @flow

import * as React from 'react';
import {Link} from '@reach/router';
import profileImg from '../img/profile_256x256.jpg';
import '../css/landing.css';

export default function Landing() {
    return (
        <section id="landing">
            <div className="img-link-container">
                <a href="/">
                    <img src={profileImg} alt="profile-img" />
                </a>
            </div>

            <div id="landing-desc">
                Hi, my name is Binh and I like solving software problems.
                This is a bit generic though so you can check out my projects&nbsp;
                <Link to="/projects">here</Link>.

                <br /><br />

                My contact information can be found <Link to="/contact">here</Link>.
            </div>

        </section>
    )
}
