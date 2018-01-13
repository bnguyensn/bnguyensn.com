/** ******** HEADER ********** **/

import React, {Component} from 'react';
import '../../css/headerfooter.css';

/** Navigation button */
function NavButton(props) {
    return (
        <a href={props.link}>
            <div className='nav-button'>
                <span className='nav-button-content'>
                    {props.content}
                </span>
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
            <div id='header-canvas'>
                <div id='header-container'>
                    <div id='header-main'>
                        <NavButton link='/'
                                   content={<i className='material-icons'>home</i>}
                        />
                        <NavButton link='/about' content='ABOUT' />
                        <NavButton link='/projects' content='PROJECTS' />
                    </div>
                    <div id='header-side'>
                        <NavButton link='/credits' content='CREDITS'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header