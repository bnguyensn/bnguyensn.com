import React, {Component} from 'react';
import '../../css/headerfooter.css';

function NavButton(props) {
    return (
        <a className='nav-btn-link' href={props.link}>
            <div className='nav-btn'>
                <span className='nav-btn-content'>
                    {props.content}
                </span>
            </div>
        </a>
    )
}

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