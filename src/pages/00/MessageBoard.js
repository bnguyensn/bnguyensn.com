import React, {Component} from 'react';

const PostDatabase = {};

function MsgIcon(props) {
    return (
        <div className='msgb-msg-icon-container'>
            {props.icon}
        </div>
    )
}

function MsgBodyWithSubject(props) {
    const d = new Date();
    const dStr = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    return (
        <div className='msgb-msg-body-container'>
            <div className='msgb-msg-subject'>{props.subject}</div>
            <div className='msgb-msg-message'>{props.message}</div>
            <div className='msgb-msg-timestamp'>{dStr}</div>
        </div>
    )
}

function MsgBody(props) {
    const d = new Date();
    const dStr = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    return (
        <div className='msgb-msg-body-container'>
            <div className='msgb-msg-message'>{props.message}</div>
            <div className='msgb-msg-timestamp'>{dStr}</div>
        </div>
    )
}

function Msg(props) {
    return (
        <div className='msgb-msg-container'>
            <MsgIcon icon={props.icon} />
            <MsgBody message={props.message} />
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
                <Msg icon={<i className='material-icons'>message</i>}
                     message={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec pharetra nisl. Curabitur
                      non metus. ${this.state.scroll_y} | ${this.state.scroll_y_bottom}`} />
            </div>
        )
    }
}

export default MessageBoard