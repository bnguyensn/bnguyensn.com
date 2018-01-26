import React, {Component} from 'react';
import MIcon from './00_MIcon';
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
    const extraCls = props.extraCls !== undefined ? props.extraCls : '';

    function navigate(e) {
        e.preventDefault();
        window.history.pushState({url: props.link}, '', props.link);
        props.navigate(props.link);
    }

    return (
        <a id={id} className={`nav-btn-link ${extraCls}`} href={props.link} onClick={navigate}>
            <div className='nav-btn'>
                <span className='nav-btn-content'>
                    {props.content}
                </span>
                <span className='nav-btn-content'>
                    {props.contentIcon}
                </span>
            </div>
        </a>
    )
}

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='header-canvas'>
                <div id='header-container'>
                    <div id='header-title'>
                        <NavButton extraCls='nav-btn-title' link='/' content='binh nguyen' contentIcon='b.n'
                                   navigate={this.props.navigate} />
                    </div>
                    <div id='header-navs'>
                        <NavButton link='/about' content='about' contentIcon={<MIcon icon='account_box' />}
                                   navigate={this.props.navigate} />
                        <NavButton link='/archive' content='archive' contentIcon={<MIcon icon='archive' />}
                                   navigate={this.props.navigate} />
                        <NavButton link='/projects' content='projects' contentIcon={<MIcon icon='weekend' />}
                                   navigate={this.props.navigate} />
                        <NavButton link='/contact' content='contact' contentIcon={<MIcon icon='mail' />}
                                   navigate={this.props.navigate} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Header