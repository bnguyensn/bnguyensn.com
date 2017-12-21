import React, {Component} from 'react';

const classNames = require('classnames');

const messagesLoadedPerScroll = 20; // Number of messages loaded each time the user scrolls up.
const thisUserID = 0; // TODO: somehow obtain this user's ID from login.

// Components

class MessageBubble extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readReceipt: 0 // Read receipt state
        }
    }

    render() {
        // If this user is the sender, the message bubble is aligned to the right.
        const messageClass = classNames(
            'message-bubble-container',
            {'message-bubble-container-left': !this.props.isSelf},
            {'message-bubble-container-right': this.props.isSelf}
        );

        return (
            <div className={messageClass}>
                <a className='message-bubble-sender-name' href='#'>{this.props.senderName}</a>
                <p className='message-bubble-content'>{this.props.content}</p>
                <span className='message-bubble-time'>{this.props.time}</span>
                <span className='message-bubble-read-receipt'>{this.state.readReceipt}</span>
            </div>
        );
    }
}

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldestMessageIndex: 0, // Index of the oldest message being loaded
            messages: [] // Array containing loaded messages of this conversation
        };
        this.handleScrolledTop = this.handleScrolledTop.bind(this);
        this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
        this.appendMessages = this.appendMessages.bind(this);
    }

    componentDidMount() {
        // When the message list is called for the first time, load initial messages.
        this.appendMessages();
    }

    handleScrolledTop() {
        // When the user scrolled to the top, load next messages.
        this.appendMessages();
    }

    getMessagesFromDatabase(startIndex, amount) {
        let messages = []; // TODO: MySQL query for message array
        return messages
    }

    appendMessages() {
        // Modifies the message array state
        const newMessages = this.getMessagesFromDatabase(this.state.oldestMessageIndex, this.props.messagesLoadedPerScroll);
        this.setState({
            messages: [...this.state.messages, newMessages]
        });
    }

    render() {
        return (
            <div className='message-list-container'>
                {this.state.messages.map((message) =>
                <MessageBubble
                    key={message.id}
                    isSelf={thisUserID === message.senderID}
                    senderID={message.senderID}
                    senderName={message.senderName}
                    content={message.content}
                    time={message.time} />
                )}
            </div>
        )
    }
}

class ConversationWindow extends Component {
    render() {
        return(
            <div id='conversation-box-container'>
                <MessageList
                    messagesLoadedPerScroll={messagesLoadedPerScroll}
                    />
            </div>
        )
    }
}

export default ConversationWindow