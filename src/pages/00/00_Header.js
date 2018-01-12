/** ******** HEADER ********** **/

import React, {Component} from 'react';
import '../../css/headerfooter.css';

/** Navigation button component */
function NavButton(props) {
    return (
        <a href={props.link}>
            <div className="nav-button">
                {props.content}
            </div>
        </a>
    )
}

/**
 * Header component
 * Navigation structures: Home | About | Projects
 */
class Header extends Component {
    render() {
        return (
            <div id="header-container">
                <NavButton link="/"
                           content={<i className="nav-button-content material-icons md-24 md-light">home</i>}
                />
                <NavButton link="/about" content="About" />
                <NavButton link="/projects" content="Projects" />
            </div>
        )
    }
}

export default Header