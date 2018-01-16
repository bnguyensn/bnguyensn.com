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
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            scroll_y: 0,
            scroll_y_bottom: ''
        }
    }

    getPostList() {

    }

    handleScroll() {
        console.log('Scroll event fired.');
        const at_bottom = ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) ? 'yup' : '';
        this.setState({
            scroll_y: window.scrollY,
            scroll_y_bottom: at_bottom
        });

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <div className='msgb-canvas'>
                {this.state.scroll_y}
                {this.state.scroll_y_bottom}
            </div>
        )
    }
}

export default MessageBoard