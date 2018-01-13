import React, {Component} from 'react';

const textBoxPlaceholder = 'Type /roll 1d100!';
const smileyIconURL = '';
const attachmentIconURL = '';

// ========= Text box where users type

class TextBox extends Component {
    constructor(props) {
        super(props);
        this.handleTyping = this.handleTyping.bind(this);
        this.state = {
            content: ''
        }
    }

    handleTyping(e) {
        this.setState({
            content: e.target.value
        })
    }

    render() {
        return(
            <div>
                <input
                    type='text'
                    placeholder={textBoxPlaceholder}
                    value={this.state.content}
                    onChange={this.handleTyping} />
            </div>
        )
    }
}

// ========== Buttons for the typing box

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='chat-button'>
                <a href='#'>
                    <img src={this.props.icon} alt={this.props.iconAlt} />
                </a>
            </div>
        )
    }
}

function SmileyButton() {
    return(
        <Button
            icon={smileyIconURL}
            iconAlt='Smiley' />
    )
}

function AttachmentButton() {
    return(
        <Button
            icon={attachmentIconURL}
            iconAlt='Attachment' />
    )
}

// ========== The typing box - All together

class TypingWindow extends Component {
    render() {
        return(
            <div id='typing-box-container'>
                <TextBox />
                <SmileyButton />
                <AttachmentButton />
            </div>
        )
    }
}

export default TypingWindow