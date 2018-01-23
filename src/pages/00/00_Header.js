import React, {Component} from 'react';
import '../../css/headerfooter.css';

function Cover(props) {
    return (
        <div className='header-cover-container'>

        </div>
    )
}

function ProfilePic(props) {
    return (
        <div className='header-ppic-container'>

        </div>
    )
}


function NavButton(props) {
    const id = props.id !== undefined ? props.id : null;
    const extraCls = props.className !== undefined ? props.className : '';

    return (
        <a id={id} className={`nav-btn-link ${extraCls}`} href={props.link}>
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
                    <div id='header-title'>
                        <NavButton className='nav-btn-title' link='/' content='binh nguyen' />
                    </div>
                    <div id='header-navs'>
                        <NavButton link='/about' content='about' />
                        <NavButton link='/archive' content='archive' />
                        <NavButton link='/projects' content='projects' />
                        <NavButton link='/contact' content='contact' />
                    </div>
                </div>
            </div>
        )
    }
}

export default Header