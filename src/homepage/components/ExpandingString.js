// @flow

import * as React from 'react';

type Props = {
    str: string,  // The string to be expanded
    emCharPos: number  // The position of the character that the string
                       // collapses into
}

type State = {
    collapsed: boolean
}

class ExpandingString extends React.PureComponent<Props, State> {
    constructor(props) {
        super(props);
        this.emCharPos = this.props.emCharPos >= letters.length ? 0 : this.props.emCharPos;  // Sanitise emCharPos

        // Set up letter spans
        const letters = this.props.str.split('');
        this.letterSpans = letters.map((letter, i) => (
            i === this.emCharPos ? <span className="expanding-str-em-char">{letter}</span> : <span>{letter}</span>
        ));

        this.state = {
            collapsed: false
        };
    }

    expand = () => {
        // We reverse out the CSS style classes applied in collapse() here

        for (let i = 0; i < this.letterSpans.length; i++) {
            this.letterSpans[i].className = '';
        }

        this.setState({
            collapsed: false
        });
    };

    collapse = () => {
        // Two things should happen simultaneously:
        // - All non-anchor letters should move to the anchor
        // - All non-anchor letters should be faded to 0 opacity

        for (let i = 0; i < this.letterSpans.length; i++) {
            this.letterSpans[i].className += ` collapsed ${i === this.emCharPos ? '' : 'faded'}`;
        }

        this.setState({
            collapsed: true
        });
    };

    render() {
        return (
            <div className="expanding-str"
                 onClick={this.state.collapsed ? this.expand : this.collapse}>
                {this.letterSpans}
            </div>
        )
    }
}

export default ExpandingString
