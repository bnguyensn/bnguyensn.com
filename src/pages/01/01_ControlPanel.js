import React, {Component} from 'react';

function Button(props) {
    function handleClick(e) {
        props.handleClick(e);
    }

    return (
        <div className={`cp-btn-container`} onClick={handleClick}>
            <i className='material-icons'>{props.icon}</i>
        </div>
    )
}

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.actionDoNothing = this.actionDoNothing.bind(this);
        this.actionPostMessage = this.actionPostMessage.bind(this);
    }

    actionDoNothing() {

    }

    actionPostMessage(e) {
        e.preventDefault();
        console.log('Clicked!');
    }

    render() {
        return (
            <div className='cp-container'>
                <div className='cp-bar'>
                    <Button icon='message' handleClick={this.actionPostMessage} />
                </div>
            </div>
        )
    }
}

export default ControlPanel