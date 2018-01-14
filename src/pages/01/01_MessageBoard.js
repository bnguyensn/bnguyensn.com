import React, {Component} from 'react';

const PostDatabase = {};

function PostIcon(props) {
    return (
        <div className='msgb-post-icon-container'>
            <img className='msgb-post-icon' src={props.icon}/>
        </div>
    )
}

function PostBodyMessage(props) {
    return (
        <div className='msgb-post-body-msg-container'>
            <p>
                <span className='msgb-post-body-msg-subject'>{props.subject}</span>
                <p className='msgb-post-body-msg-message'>{props.message}</p>
            </p>
        </div>
    )
}

function PostBodyTimestamp(props) {
    return (
        <div className='msgb-post-body-timestamp'>

        </div>
    )
}

function PostBody(props) {
    return (
        <div className='msgb-post-body-container'>
            <PostBodyMessage subject={props.subject} message={props.message} />
            <PostBodyTimestamp />
        </div>
    )
}

function Post(props) {
    return (
        <div className='msgb-post-container'>
            <PostIcon icon={props.icon} />
            <PostBody subject={props.subject} message={props.message} />
        </div>
    )
}

class MessageBoard extends Component {
    getPostList() {

    }

    render() {
        return (
            <div className='msgb-container'>

            </div>
        )
    }
}

export default MessageBoard