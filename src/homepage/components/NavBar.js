// @flow

import * as React from 'react';
import {Link} from '@reach/router';

import '../css/nav-bar.css';

/** ********** SUPPORT COMPONENTS ********** **/

type NavLinkProps = {
    href: string,
    text: string
}

function NavLink(props: NavLinkProps) {
    return (
        <div className="nav-link">
            <Link to={props.href}>
                {props.text}
            </Link>
        </div>
    )
}

/** ********** MAIN EXPORT ********** **/

function NavBar() {
    return (
        <nav id='header-nav-bar'>
            <NavLink href="/about" text="ABOUT" />
            <NavLink href="/blog" text="BLOG" />
            <NavLink href="/projects" text="PROJECTS" />
            <NavLink href="/contact" text="CONTACT" />
        </nav>
    )
}

export default NavBar