import React, {Component} from 'react';

import ConversationWindow from './03_ConversationWindow';
import TypingWindow from './03_TypingWindow';

class Chat extends Component {
    render() {
        return(
            <div id='chat-container'>
                <ConversationWindow />
                <TypingWindow />
            </div>
        )
    }
}

export default Chat