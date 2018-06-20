// @flow

import * as React from 'react';

type Props = {
    str: string,  // The string to be expanded
    anchorPos: number  // The position of the character that the string
                       // collapses into
}

type State = {
    collapsed: boolean
}

class ExpandingString extends React.PureComponent<Props, State> {
    anchorPos: number;
    letterSpans: React.Node[];

    constructor(props: Props) {
        super(props);

        // Set up letter spans
        const letters = this.props.str.split('');
        this.anchorPos = this.props.anchorPos >= letters.length ? 0 : this.props.anchorPos;  // Sanitise anchorPos
        this.letterSpans = letters.map((letter, i) => (
            i === this.anchorPos ? <span className="expanding-str-anchor">{letter}</span> : <span>{letter}</span>
        ));

        this.state = {
            collapsed: false
        };
    }

    componentDidMount = () => {

    };

    expand = (e: SyntheticEvent<HTMLElement>) => {
        // We reverse out the CSS style classes applied in collapse() here

        const stringE = e.currentTarget;
        const stringLetterEs = stringE.children;

        for (let i = 0; i < stringLetterEs.length; i++) {
            if (i !== this.anchorPos) {
                stringLetterEs[i].className = '';
                stringLetterEs[i].style.top = '0';
                stringLetterEs[i].style.left = '0';
            }
        }

        this.setState({
            collapsed: false
        });
    };

    collapse = (e: SyntheticEvent<HTMLElement>) => {
        // Two things should happen simultaneously:
        // - All non-anchor letters should move to the anchor
        // - All non-anchor letters should be faded to 0 opacity

        const stringE = e.currentTarget;
        const stringLetterEs = stringE.children;

        const anchorOffsetTop = stringLetterEs[this.anchorPos].offsetTop;
        const anchorOffsetLeft = stringLetterEs[this.anchorPos].offsetLeft;

        for (let i = 0; i < stringLetterEs.length; i++) {
            if (i !== this.anchorPos) {
                stringLetterEs[i].className += ` collapsed ${i === this.anchorPos ? '' : 'faded'}`;
                stringLetterEs[i].style.top = `${anchorOffsetTop}px`;
                stringLetterEs[i].style.left = `${anchorOffsetLeft}px`;
            }
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
