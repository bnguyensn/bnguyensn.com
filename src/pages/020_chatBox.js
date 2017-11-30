import React, {Component} from 'react';
import './css/index.css';

import ConversationBox from './021_conversationBox';
import TypingBox from "./022_typingBox";

class ChatBox extends Component {
    render() {
        return(
            <div id='chat-box-container'>
                <ConversationBox />
                <TypingBox />
            </div>
        )
    }
}

export default ChatBox