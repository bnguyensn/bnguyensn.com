import React, {Component} from 'react';
const classnames = require('classnames');

/** ********** CONTROL PANEL BUTTONS ********** **/

function Button(props) {
    function handleClick(e) {
        props.handleClick(e);
    }

    return (
        <div className={`cp-btn-container ${props.name}`} onClick={handleClick}>
            <i className='material-icons'>{props.icon}</i>
        </div>
    )
}

function ButtonSVG(props) {
    function handleClick(e) {
        props.handleClick(e);
    }

    return (
        <div className={`cp-btn-container ${props.name}`} onClick={handleClick}>
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>{props.title}</title>
                <path d={props.path} />
            </svg>
        </div>
    )
}

/** ********** CONTROL PANEL INPUTS ********** **/

function TextInput(props) {
    function handleChange(e) {
        props.handleChange(e);
    }

    return (
        <div className={`cp-inp-container ${props.widthControl}`} name='message'>
            <input className={`cp-inp ${props.isShown}`}
                   name={props.name}
                   type='text'
                   placeholder={props.placeholder}
                   value={props.value}
                   onChange={handleChange}/>
        </div>
    )
}

/** ********** CONTROL PANEL MAIN ********** **/

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.actionDoNothing = this.actionDoNothing.bind(this);
        this.msgBtnClicked = this.msgBtnClicked.bind(this);
        this.actionTweet = this.actionTweet.bind(this);
        this.actionHelp = this.actionHelp.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            message_btn_clicked: false,
            message: ''
        }
    }

    /* ********** BUTTONS ********** */

    actionDoNothing() {

    }

    msgBtnClicked(e) {
        this.setState((prevState, props) => {
            return {
                message_btn_clicked: !prevState.message_btn_clicked,
            }
        });
    }

    actionTweet(e) {
        console.log('Clicked!');
    }

    actionHelp(e) {
        console.log('Clicked!');
    }

    /* ********** INPUTS ********** */

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    /* ********** MAIN ********** */

    render() {
        const bar_width_control = classnames({
            'min-width-100p': this.state.message_btn_clicked
        });
        const inp_msg_width_control = classnames({
            'cp-inp-container-max': this.state.message_btn_clicked,
        });

        return (
            <div className='cp-canvas'>
                <div className={`cp-bar ${bar_width_control}`}>
                    <Button name='btn-msg' icon='message' handleClick={this.msgBtnClicked} />
                    <TextInput widthControl={inp_msg_width_control}
                               name='message'
                               placeholder='Type in some message...'
                               value={this.state.message}
                               handleChange={this.handleInputChange} />
                    <ButtonSVG path='M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z'
                               name='btn-twitter'
                               handleClick={this.actionTweet} />
                    <Button name='btn-help' icon='help' handleClick={this.actionHelp} />
                </div>
            </div>
        )
    }
}

export default ControlPanel